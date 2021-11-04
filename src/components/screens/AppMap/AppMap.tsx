import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
  useEffect,
} from 'react';
import {ClusterMap, ClusterMapShape, BottomMenu} from 'atoms';
import {
  createMarkerFromObject,
  selectMapFilters,
  selectTransformedData,
  getMapMarkers,
} from 'core/selectors';
import {useSelector} from 'react-redux';
import {StyleProp, View} from 'react-native';
import bbox from '@turf/bbox';

import {styles, selectedPointStyle} from './styles';
import {IMapFilter, IObject} from 'core/types';
import MapBox, {
  OnPressEvent,
  SymbolLayerStyle,
  RegionPayload,
} from '@react-native-mapbox-gl/maps';
import {
  AppMapBottomMenu,
  AppMapBottomSearchMenu,
  AppMapFilters,
  AppMapButtons,
} from 'molecules';
import {
  useStatusBar,
  useSearchList,
  useFocusToUserLocation,
  useBackHandler,
  useColorScheme,
  useTransformedData,
  useAppMapAnalytics,
  useBottomMenu,
  useFindZoomForObjectInCluster,
  useStaticCallback,
} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IProps} from './types';

import {Geometry, Feature, Position, Point} from '@turf/helpers';
type SelecteMarker = ReturnType<typeof createMarkerFromObject>;

import {mapService} from 'services/MapService';
import {WINDOW_HEIGHT} from 'services/PlatformService';
import Supercluster from 'supercluster';
import {xorBy} from 'lodash';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

export const AppMap = ({navigation}: IProps) => {
  const sheme = useColorScheme();
  const mapFilters = useSelector(selectMapFilters);
  const appData = useSelector(selectTransformedData);

  const camera = useRef<MapBox.Camera>(null);
  const map = useRef<MapBox.MapView>(null);
  const shapeSourceRef = useRef<MapBox.ShapeSource>(null);
  const ignoreFitBounds = useRef(false);

  const [selectedObject, setSelectedObject] = useState<null | IObject>(null);
  const [selectedMarker, setSelectedMarker] = useState<SelecteMarker | null>(
    () => createMarkerFromObject(null),
  );

  const [selectedFilters, setSelectedFilters] = useState<IMapFilter[]>([]);

  const [markers, setMarkers] = useState(() =>
    getMapMarkers(appData, selectedFilters),
  );

  const {getObject} = useTransformedData();
  const {top} = useSafeAreaInsets();

  const bounds = useMemo(() => {
    if (markers) {
      return mapService.getBoundsFromGeoJSON(markers, {
        bottom: 70,
        top: top + 20,
      });
    }

    return null;
  }, [markers, top]);

  const {bottom} = useSafeAreaInsets();
  const {
    data,
    isHistoryVisible,
    onTextChange,
    addToHistory,
    inputValue,
    clearInput,
  } = useSearchList({withLocation: true});

  useStatusBar(sheme);

  useAppMapAnalytics();

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
      const newMarkers = getMapMarkers(appData, newSelectedFilters);
      setSelectedFilters(newSelectedFilters);
      setMarkers(newMarkers);
    },
    [appData, selectedFilters],
  );

  const resetFilters = useCallback(() => {
    const newSelectedFilters = [];
    const newMarkers = getMapMarkers(appData, newSelectedFilters);
    setSelectedFilters(newSelectedFilters);
    setMarkers(newMarkers);
  }, [appData]);

  useLayoutEffect(() => {
    if (bounds) {
      if (!ignoreFitBounds.current) {
        camera.current?.fitBounds(...bounds);
      } else {
        ignoreFitBounds.current = false;
      }
    }
  }, [bounds]);

  const unselectObject = useCallback(() => {
    closeMenu();
    setSelectedMarker(createMarkerFromObject(null));
  }, [closeMenu]);

  const onMapPress = useCallback(() => {
    if (isMenuOpened()) {
      unselectObject();
    }
  }, [isMenuOpened, unselectObject]);

  useEffect(() => {
    if (selectedObject) {
      openMenu();
    }
  }, [openMenu, selectedObject]);

  const selectObjectAndOpenMenu = useCallback((object: IObject) => {
    hapticFeedbackService.trigger();
    setSelectedObject({...object});
    setSelectedMarker(createMarkerFromObject(object));
  }, []);

  const onShapePress = useCallback(
    async (objectId: string) => {
      const itemData = getObject(objectId);

      if (itemData) {
        const currentZoom = await map.current?.getZoom();

        const coordinates = [itemData.location!.lon!, itemData.location!.lat!];
        camera.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: currentZoom,
          animationDuration: 500,
        });
        selectObjectAndOpenMenu(itemData);
      }
    },
    [getObject, selectObjectAndOpenMenu],
  );

  const navigateToObjectDetails = useCallback(
    ({id}: IObject) => {
      unselectObject();
      navigation.push('ObjectDetails', {objectId: id});
    },
    [unselectObject, navigation],
  );

  const {findZoomForObjectInCluster} = useFindZoomForObjectInCluster();

  const moveCameraToSearchedObject = useCallback(
    async (
      object: IObject,
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
    (object: IObject) => {
      let newFitlters = selectedFilters;
      let newMarkers = markers;

      if (selectedFilters.length) {
        ignoreFitBounds.current = true;

        newFitlters = [];
        newMarkers = getMapMarkers(appData, newFitlters);

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
      addToHistory,
      appData,
      clearInput,
      closeSearchMenu,
      markers,
      moveCameraToSearchedObject,
      selectObjectAndOpenMenu,
      selectedFilters,
    ],
  );

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

  const fitToClusterLeaves = useCallback(async (event: OnPressEvent) => {
    const {features} = event;
    const isCluster = features[0]?.properties?.cluster;

    if (isCluster) {
      const cluster = features[0] as Feature<Geometry, {cluster_id: number}>;
      const {
        geometry: {coordinates},
      } = cluster;

      const zoom = await shapeSourceRef.current?.getClusterExpansionZoom(
        cluster,
      );
      camera.current?.setCamera({
        centerCoordinate: coordinates as Position,
        zoomLevel: zoom,
        animationDuration: 200,
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

  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={map}
        cameraRef={camera}
        onRegionWillChange={unfocusUserLocation}
        onShapePress={onShapePress}
        onPress={onMapPress}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation renderMode="native" {...userLocationProps} />
        ) : null}
        {markers ? (
          <ClusterMapShape
            ref={shapeSourceRef}
            onShapePress={fitToClusterLeaves}
            markers={markers}
          />
        ) : null}

        {selectedMarker ? (
          <MapBox.ShapeSource
            id={'selectedPointShapeSource'}
            shape={selectedMarker}>
            <MapBox.SymbolLayer
              id={'selectedPoint'}
              style={selectedPointStyle as StyleProp<SymbolLayerStyle>}
            />
          </MapBox.ShapeSource>
        ) : null}
      </ClusterMap>
      <BottomMenu onHideEnd={onMenuHideEnd} {...menuProps}>
        <AppMapBottomMenu
          data={selectedObject}
          bottomInset={bottom}
          onGetMorePress={navigateToObjectDetails}
        />
      </BottomMenu>

      <BottomMenu
        showDragIndicator={false}
        menuHeight={WINDOW_HEIGHT * 0.95}
        {...searchMenuProps}>
        <AppMapBottomSearchMenu
          onBackPress={closeSearchMenu}
          inputValue={inputValue}
          isHistoryVisible={isHistoryVisible}
          data={data}
          onItemPress={onSearchItemPress}
          onTextChange={onTextChange}
          bottomInset={bottom}
        />
      </BottomMenu>

      <AppMapButtons
        isUserLocationFocused={isUserLocationFocused}
        bottomMenuPosition={menuProps.animatedPosition}
        onShowLocationPress={onShowLocationPress}
        onSearchPress={openSearchMenuAndPersistData}
      />
      <AppMapFilters
        onFilterSelect={onFilterSelect}
        resetFilters={resetFilters}
        selectedFilters={selectedFilters}
        filters={mapFilters}
      />
    </View>
  );
};
