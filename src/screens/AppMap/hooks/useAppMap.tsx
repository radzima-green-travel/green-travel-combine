import {
  useRef,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';
import {selectAppLanguage} from 'core/selectors';

import {selectAppMapObjects, selectMapFilters} from 'core/selectors/appMap';
import {
  getMapMarkers,
  createMarkerFromObject,
} from 'core/transformators/appMap';
import {useSelector} from 'react-redux';
import bbox from '@turf/bbox';
import {IMapFilter, ObjectMap, SearchObject} from 'core/types';

import {ShapeSource, Camera, MapView} from '@rnmapbox/maps';

import {
  useSearchList,
  useFocusToUserLocation,
  useBottomMenu,
  useFindZoomForObjectInCluster,
  useStaticCallback,
  useAppMapAnalytics,
  useBackHandler,
  useColorScheme,
  useStatusBar,
  useOnRequestSuccess,
  useRequestLoading,
  useOnRequestError,
} from 'core/hooks';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Feature, Point, Position} from '@turf/helpers';

import {mapService} from 'services/MapService';
import Supercluster from 'supercluster';
import {xorBy, find} from 'lodash';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {useNavigation} from '@react-navigation/native';
import {ObjectsListScreenNavigationProps} from '../types';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useDispatch} from 'react-redux';
import {getAppMapObjectsRequest} from 'core/actions';

type SelecteMarker = ReturnType<typeof createMarkerFromObject>;

interface RegionPayload {
  zoomLevel: number;
  heading: number;
  animated: boolean;
  isUserInteraction: boolean;
  visibleBounds: Position[];
  pitch: number;
}

type OnPressEvent = {
  features: Array<GeoJSON.Feature>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  point: {
    x: number;
    y: number;
  };
};

export const useAppMap = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<ObjectsListScreenNavigationProps>();
  const objects = useSelector(selectAppMapObjects);
  const currentLocale = useSelector(selectAppLanguage);

  const camera = useRef<Camera>(null);
  const map = useRef<MapView>(null);
  const shapeSourceRef = useRef<ShapeSource>(null);
  const ignoreFitBounds = useRef(false);

  const [selectedObject, setSelectedObject] = useState<null | ObjectMap>(null);
  const [selectedMarker, setSelectedMarker] = useState<SelecteMarker | null>(
    () => createMarkerFromObject(null),
  );

  const [selectedFilters, setSelectedFilters] = useState<IMapFilter[]>([]);

  const isObjectsEmpty = !objects.length;

  const [markers, setMarkers] = useState(() => {
    return !isObjectsEmpty ? getMapMarkers(objects, selectedFilters) : null;
  });

  const {top} = useSafeAreaInsets();

  const getAppMapObjects = useCallback(() => {
    dispatch(getAppMapObjectsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isObjectsEmpty) {
      getAppMapObjects();
    }
  }, [getAppMapObjects, isObjectsEmpty]);

  useOnRequestSuccess(getAppMapObjectsRequest, () => {
    setMarkers(getMapMarkers(objects, selectedFilters));
  });

  const {loading} = useRequestLoading(getAppMapObjectsRequest);

  const {errorTexts} = useOnRequestError(getAppMapObjectsRequest, '');

  const bounds = useMemo(() => {
    if (markers) {
      return mapService.getBoundsFromGeoJSON(markers, {
        bottom: 70,
        top: top + 20,
      });
    }

    return null;
  }, [markers, top]);

  const {
    data,
    isHistoryVisible,
    onTextChange,
    addToHistory,
    deleteAllFromHistory,
    deleteFromHistory,
    inputValue,
    clearInput,
    ...searchListProps
  } = useSearchList({withLocation: true});

  const {openMenu, closeMenu, isMenuOpened, ...menuProps} = useBottomMenu();
  const {
    openMenu: openSearchMenu,
    closeMenu: closeSearchMenu,
    isMenuOpened: isSearchMenuOpened,
    ...searchMenuProps
  } = useBottomMenu();

  const onFilterSelect = useCallback(
    (item: IMapFilter) => {
      const newSelectedFilters = xorBy(selectedFilters, [item], 'categoryId');
      const newMarkers = getMapMarkers(objects, newSelectedFilters);
      setSelectedFilters(newSelectedFilters);
      setMarkers(newMarkers);
    },
    [objects, selectedFilters, setMarkers],
  );

  const resetFilters = useCallback(() => {
    const newSelectedFilters = [];
    const newMarkers = getMapMarkers(objects, newSelectedFilters);
    setSelectedFilters(newSelectedFilters);
    setMarkers(newMarkers);
  }, [objects, setMarkers]);

  const unselectObject = useCallback(() => {
    closeMenu();
    setSelectedMarker(createMarkerFromObject(null));
  }, [closeMenu]);

  const onMapPress = useCallback(() => {
    if (isMenuOpened()) {
      unselectObject();
    }
  }, [isMenuOpened, unselectObject]);

  const selectObjectAndOpenMenu = useCallback(
    (object: SearchObject) => {
      hapticFeedbackService.trigger();
      const objectMap = find(objects, {id: object.id});
      if (objectMap) {
        setSelectedObject({...objectMap});
        setSelectedMarker(createMarkerFromObject(objectMap));
      }
    },
    [objects],
  );

  const onShapePress = useCallback(
    async (objectId: string | null) => {
      if (objectId) {
        const itemData = find(objects, {id: objectId});

        if (itemData) {
          const currentZoom = await map.current?.getZoom();

          const coordinates = [
            itemData.location!.lon!,
            itemData.location!.lat!,
          ];

          camera.current?.setCamera({
            centerCoordinate: coordinates,
            zoomLevel: currentZoom,
            animationDuration: 500,
            animationMode: 'easeTo',
          });
          selectObjectAndOpenMenu(itemData);
        }
      }
    },
    [objects, selectObjectAndOpenMenu],
  );

  const navigateToObjectDetails = useCallback(
    ({id}: ObjectMap) => {
      unselectObject();
      navigation.push('ObjectDetails', {
        objectId: id,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [unselectObject, navigation],
  );

  const {findZoomForObjectInCluster} = useFindZoomForObjectInCluster();

  const moveCameraToSearchedObject = useCallback(
    async (
      object: SearchObject,
      cluster: Supercluster<Supercluster.AnyProps, Supercluster.AnyProps>,
      clusterBounds,
    ) => {
      const location = object.location;
      const coordinates = location ? [location.lon!, location.lat!] : null;

      if (coordinates) {
        const visibleClusters = cluster.getClusters(clusterBounds, 4);

        const currentZoom = await map.current?.getZoom();

        if (visibleClusters && currentZoom) {
          const zoomLevel = findZoomForObjectInCluster(
            cluster,
            object,
            visibleClusters,
            currentZoom,
          );

          if (zoomLevel) {
            camera.current?.setCamera({
              centerCoordinate: coordinates,
              zoomLevel: zoomLevel,
              animationDuration: 600,
            });
          }
        }
      }
    },
    [findZoomForObjectInCluster],
  );

  const onSearchItemPress = useCallback(
    (object: SearchObject) => {
      let newFitlters = selectedFilters;
      let newMarkers = markers;

      if (selectedFilters.length) {
        ignoreFitBounds.current = true;

        newFitlters = [];
        newMarkers = getMapMarkers(objects, newFitlters);

        setSelectedFilters(newFitlters);
        setMarkers(newMarkers);
      }

      closeSearchMenu();
      const clusterBounds = bbox(newMarkers);
      const cluster = new Supercluster({
        radius: 40,
        maxZoom: 14,
      }).load(newMarkers?.features!);

      moveCameraToSearchedObject(object, cluster, clusterBounds);

      addToHistory(object);
      selectObjectAndOpenMenu(object);
      clearInput();
    },
    [
      selectedFilters,
      markers,
      closeSearchMenu,
      moveCameraToSearchedObject,
      addToHistory,
      selectObjectAndOpenMenu,
      clearInput,
      objects,
      setMarkers,
    ],
  );

  const onDeleteItem = useCallback(
    (searchItem: SearchObject) => {
      deleteFromHistory(searchItem.id);
    },
    [deleteFromHistory],
  );

  const onDeleteAllItems = useCallback(() => {
    deleteAllFromHistory();
  }, [deleteAllFromHistory]);

  const onMenuHideEnd = useStaticCallback(() => {
    setSelectedObject(null);

    if (selectedMarker) {
      setSelectedMarker(createMarkerFromObject(null));
    }
  }, [selectedMarker]);

  const openSearchMenuAndPersistData = useCallback(() => {
    closeMenu();
    openSearchMenu();
  }, [closeMenu, openSearchMenu]);

  const {
    focusToUserLocation,
    setIsUserLocationFocused,
    isUserLocationFocused,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const fitToClusterLeaves = useCallback((event: OnPressEvent) => {
    const {features} = event;
    const isCluster = features[0]?.properties?.cluster;

    if (isCluster) {
      const cluster = features[0] as GeoJSON.Feature<
        GeoJSON.Point,
        {cluster_id: number}
      >;
      const {
        geometry: {coordinates},
      } = cluster;

      shapeSourceRef.current?.getClusterExpansionZoom(cluster).then(zoom => {
        camera.current?.setCamera({
          centerCoordinate: coordinates as Position,
          zoomLevel: zoom,
          animationDuration: 200,
        });
      });
    }
  }, []);

  const onShowLocationPress = useCallback(async () => {
    const currentZoom = (await map.current?.getZoom()) || null;

    focusToUserLocation(bounds, currentZoom);
  }, [bounds, focusToUserLocation]);

  const unfocusUserLocation = useCallback(
    (feature: Feature<Point, RegionPayload>) => {
      const {
        properties: {isUserInteraction},
      } = feature;

      if (isUserInteraction) {
        setIsUserLocationFocused(false);
      }
    },
    [setIsUserLocationFocused],
  );

  const sheme = useColorScheme();
  const mapFilters = useSelector(selectMapFilters);

  const {bottom} = useSafeAreaInsets();
  useStatusBar(sheme);

  useAppMapAnalytics();

  useLayoutEffect(() => {
    if (bounds) {
      if (!ignoreFitBounds.current) {
        camera.current?.fitBounds(...bounds);
      } else {
        ignoreFitBounds.current = false;
      }
    }
  }, [bounds, camera, ignoreFitBounds]);

  useEffect(() => {
    if (selectedObject) {
      openMenu();
    }
  }, [openMenu, selectedObject]);

  useBackHandler(() => {
    if (isMenuOpened()) {
      unselectObject();
      return true;
    }

    if (isSearchMenuOpened()) {
      closeSearchMenu();
      clearInput();
      return true;
    }

    return false;
  });

  return {
    bounds,
    camera,
    selectedObject,
    closeSearchMenu,
    map,
    unfocusUserLocation,
    onShapePress,
    onMapPress,
    userLocationProps,
    markers,
    shapeSourceRef,
    fitToClusterLeaves,
    selectedMarker,
    onMenuHideEnd,
    menuProps,
    navigateToObjectDetails,
    searchMenuProps,
    onDeleteAllItems,
    onDeleteItem,
    inputValue,
    isHistoryVisible,
    data,
    onSearchItemPress,
    onTextChange,
    isUserLocationFocused,
    onShowLocationPress,
    openSearchMenuAndPersistData,
    onFilterSelect,
    resetFilters,
    selectedFilters,
    bottom,
    mapFilters,
    currentLocale,
    loading,
    errorTexts,
    getAppMapObjects,
    searchListProps,
  };
};
