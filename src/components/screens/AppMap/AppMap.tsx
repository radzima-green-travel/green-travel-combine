import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import {ClusterMap, ClusterMapShape, BottomMenu} from 'atoms';
import {
  selectMapMarkers,
  selectSelectedMapMarker,
  createMarkerFromObject,
  selectMapFilters,
  selectSelectedFilters,
} from 'core/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {StyleProp, View} from 'react-native';

import {styles, selectedPointStyle} from './styles';
import {IMapFilter, IObject} from 'core/types';
import {
  setAppMapSelectedMarkerId,
  clearAppMapSelectedMarkerId,
  setAppMapSelectedFilters,
  clearAppMapSelectedFilters,
} from 'core/reducers';
import MapBox, {
  OnPressEvent,
  SymbolLayerStyle,
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
  useObjectBelongsToSubtitle,
  useAppMapAnalytics,
  useBottomMenu,
  useFindZoomForObjectInCluster,
} from 'core/hooks';
import {MAP_BOTTOM_MENU_HEIGHT} from 'core/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IProps} from './types';

import {Geometry, Feature, Position} from '@turf/helpers';
type SelecteMarker = ReturnType<typeof createMarkerFromObject>;

import {mapService} from 'services/MapService';
import {WINDOW_HEIGHT} from 'services/PlatformService';
import {find, some} from 'lodash';
export const AppMap = ({navigation}: IProps) => {
  const dispatch = useDispatch();
  const sheme = useColorScheme();
  const mapFilters = useSelector(selectMapFilters);
  const selected = useSelector(selectSelectedMapMarker);
  const markers = useSelector(selectMapMarkers);
  const shouldPersistData = useRef(false);
  const camera = useRef<MapBox.Camera>(null);
  const map = useRef<MapBox.MapView>(null);
  const shapeSourceRef = useRef<MapBox.ShapeSource>(null);
  const regionDidChangeListener = useRef<(() => void) | null>(null);

  const selectedFilters = useSelector(selectSelectedFilters);
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

  const setSelectedMarkerId = useCallback(
    (objectId: string) => {
      dispatch(setAppMapSelectedMarkerId(objectId));
    },
    [dispatch],
  );

  const [selectedMarker, setSelectedMarker] = useState<SelecteMarker | null>(
    () => createMarkerFromObject(null),
  );

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

  useEffect(() => {
    if (selected) {
      setSelectedMarker(createMarkerFromObject(selected));
      openMenu();
    }
  }, [openMenu, selected]);

  useLayoutEffect(() => {
    if (bounds) {
      camera.current?.fitBounds(...bounds);
    }
  }, [bounds]);

  const unselectObject = useCallback(() => {
    closeMenu();
    setSelectedMarker(createMarkerFromObject(null));
  }, [closeMenu]);

  const onShapePress = useCallback(
    (objectId: string, zoomLevel) => {
      const itemData = getObject(objectId);
      if (itemData) {
        const coordinates = [itemData.location!.lon!, itemData.location!.lat!];
        camera.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: zoomLevel,
          animationDuration: 500,
        });
        setSelectedMarkerId(itemData.id);
      }
    },
    [getObject, setSelectedMarkerId],
  );

  const navigateToObjectDetails = useCallback(
    ({id}: IObject) => {
      unselectObject();
      navigation.push('ObjectDetails', {objectId: id});
    },
    [unselectObject, navigation],
  );

  const {findZoomForObjectInCluster} = useFindZoomForObjectInCluster({
    shapeSourceRef: shapeSourceRef,
  });

  const moveCameraToSearchedObject = useCallback(
    async (object: IObject) => {
      const location = object.location;
      const coordinates = location ? [location.lon!, location.lat!] : null;

      if (coordinates) {
        try {
          const visibleFeatures = await shapeSourceRef.current?.features();
          const currentZoom = await map.current?.getZoom();

          if (visibleFeatures && currentZoom) {
            const zoomLevel = await findZoomForObjectInCluster(
              object,
              visibleFeatures,
              currentZoom,
            );

            if (zoomLevel) {
              camera.current?.setCamera({
                centerCoordinate: coordinates,
                zoomLevel: zoomLevel,
                animationDuration: 300,
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [findZoomForObjectInCluster],
  );

  const onSearchItemPress = (object: IObject) => {
    closeSearchMenu();

    addToHistory(object);
    setSelectedMarkerId(object.id);
    clearInput();

    const itemFilterGroup = find(mapFilters, ({categoryId}) => {
      return categoryId === object.category.id;
    });

    regionDidChangeListener.current = () => {
      regionDidChangeListener.current = null;
      moveCameraToSearchedObject(object);
    };

    if (
      itemFilterGroup &&
      !some(
        selectedFilters,
        ({categoryId}) => categoryId === itemFilterGroup.categoryId,
      )
    ) {
      dispatch(setAppMapSelectedFilters(itemFilterGroup));
    } else {
      if (bounds) {
        camera.current?.fitBounds(...bounds);
      }
    }
  };

  const onMenuHideEnd = useCallback(() => {
    if (!shouldPersistData.current) {
      dispatch(clearAppMapSelectedMarkerId());

      if (selectedMarker) {
        setSelectedMarker(createMarkerFromObject(null));
      }
    }
  }, [dispatch, selectedMarker]);

  const openSearchMenuAndPersistData = useCallback(() => {
    openSearchMenu();
    shouldPersistData.current = true;
  }, [openSearchMenu]);

  const onSearchMenuHide = useCallback(() => {
    shouldPersistData.current = false;
  }, []);

  const onFilterSelect = useCallback(
    (item: IMapFilter) => {
      dispatch(setAppMapSelectedFilters(item));
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch(clearAppMapSelectedFilters());
  }, [dispatch]);

  const {focusToUserLocation, ...userLocationProps} =
    useFocusToUserLocation(camera);

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

  const belongsToSubtitle = useObjectBelongsToSubtitle(
    selected?.belongsTo?.[0]?.objects,
  );

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
        animationDuration: 300,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={map}
        cameraRef={camera}
        onShapePress={onShapePress}
        onRegionDidChange={({properties}) => {
          if (
            !properties.isUserInteraction &&
            regionDidChangeListener.current
          ) {
            regionDidChangeListener.current();
          }
        }}
        onPress={unselectObject}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation {...userLocationProps} />
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
      <BottomMenu
        menuHeight={MAP_BOTTOM_MENU_HEIGHT + bottom}
        onHideEnd={onMenuHideEnd}
        {...menuProps}>
        <AppMapBottomMenu
          data={selected}
          bottomInset={bottom}
          onGetMorePress={navigateToObjectDetails}
          belongsToSubtitle={belongsToSubtitle}
        />
      </BottomMenu>

      <BottomMenu
        onHideEnd={onSearchMenuHide}
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
        bottomMenuPosition={menuProps.animatedPosition}
        onShowLocationPress={focusToUserLocation}
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
