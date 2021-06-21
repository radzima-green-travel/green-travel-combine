import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import Animated from 'react-native-reanimated';
import {ClusterMap, ClusterMapShape} from 'atoms';
import {
  selectMapMarkers,
  selectSelectedMapMarker,
  createMarkerFromObject,
  selectMapFilters,
  selectSelectedFilters,
} from 'core/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {StyleProp, View} from 'react-native';

import {Portal} from 'atoms';
import {styles, selectedPointStyle} from './styles';
import {IMapFilter, IObject} from 'core/types';
import {
  setAppMapSelectedMarkerId,
  clearAppMapSelectedMarkerId,
  setAppMapSelectedFilters,
  clearAppMapSelectedFilters,
} from 'core/reducers';
import MapBox, {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {
  AppMapBottomMenu,
  AppMapBottomMenuRef,
  AppMapBottomSearchMenuRef,
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
} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IProps} from './types';
type SelecteMarker = ReturnType<typeof createMarkerFromObject>;
import {featureCollection} from '@turf/helpers';
import {mapService} from 'services/MapService';
export const AppMap = ({navigation}: IProps) => {
  const dispatch = useDispatch();
  const sheme = useColorScheme();
  const mapFilters = useSelector(selectMapFilters);
  const selected = useSelector(selectSelectedMapMarker);
  const markers = useSelector(selectMapMarkers);

  const selectedFilters = useSelector(selectSelectedFilters);
  const {getObject} = useTransformedData();
  const [clusterMarkers, setClusterMarkers] = useState(featureCollection([]));
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

  useEffect(() => {
    if (markers) {
      setTimeout(() => {
        setClusterMarkers(markers);
      }, 0);
    }
  }, [markers]);

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

  const camera = useRef<MapBox.Camera>(null);
  const bottomMenu = useRef<AppMapBottomMenuRef>(null);
  const bottomSearchMenu = useRef<AppMapBottomSearchMenuRef>(null);

  useEffect(() => {
    if (selected) {
      setSelectedMarker(createMarkerFromObject(selected));
      bottomMenu.current?.show();
    }
  }, [selected]);

  const unselectObject = useCallback(() => {
    setSelectedMarker(createMarkerFromObject(null));
    bottomMenu.current?.hide();
  }, []);

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
    ({id, category}: IObject) => {
      bottomMenu.current?.hide();
      setSelectedMarker(createMarkerFromObject(null));
      navigation.push('ObjectDetails', {categoryId: category.id, objectId: id});
    },
    [navigation],
  );

  const onSearchItemPress = useCallback(
    (object: IObject) => {
      const location = object.location;
      const coordinates = location ? [location.lon!, location.lat!] : null;
      if (coordinates) {
        camera.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: 10,
          animationDuration: 400,
        });
      }

      addToHistory(object);
      setSelectedMarkerId(object.id);
      clearInput();
    },
    [addToHistory, clearInput, setSelectedMarkerId],
  );

  const onMenuHideEnd = useCallback(() => {
    dispatch(clearAppMapSelectedMarkerId());

    if (selectedMarker) {
      setSelectedMarker(createMarkerFromObject(null));
    }
  }, [dispatch, selectedMarker]);

  const onFilterSelect = useCallback(
    (item: IMapFilter) => {
      dispatch(setAppMapSelectedFilters(item));
    },
    [dispatch],
  );

  useLayoutEffect(() => {
    if (bounds) {
      camera.current?.fitBounds(...bounds);
    }
  }, [bounds]);

  const resetFilters = useCallback(() => {
    dispatch(clearAppMapSelectedFilters());
  }, [dispatch]);

  const {focusToUserLocation, ...userLocationProps} = useFocusToUserLocation(
    camera,
  );

  useBackHandler(() => {
    if (bottomMenu.current?.isOpened()) {
      unselectObject();
      return true;
    }

    if (bottomSearchMenu.current?.isOpened()) {
      bottomSearchMenu.current.hide();
      clearInput();
      return true;
    }

    return false;
  });

  useStatusBar(sheme);

  const animatedValue = useMemo(() => new Animated.Value(1), []);

  const belongsToSubtitle = useObjectBelongsToSubtitle(
    selected?.belongsTo?.[0]?.objects,
  );
  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={camera}
        onShapePress={onShapePress}
        onPress={unselectObject}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation {...userLocationProps} />
        ) : null}
        <ClusterMapShape markers={clusterMarkers} />

        <MapBox.ShapeSource
          id={'selectedPointShapeSource'}
          shape={selectedMarker}>
          <MapBox.SymbolLayer
            id={'selectedPoint'}
            style={selectedPointStyle as StyleProp<SymbolLayerStyle>}
          />
        </MapBox.ShapeSource>
      </ClusterMap>
      <Portal>
        <AppMapBottomMenu
          data={selected}
          animatedPosition={animatedValue}
          ref={bottomMenu}
          onHideEnd={onMenuHideEnd}
          bottomInset={bottom}
          onGetMorePress={navigateToObjectDetails}
          belongsToSubtitle={belongsToSubtitle}
        />
        <AppMapBottomSearchMenu
          inputValue={inputValue}
          isHistoryVisible={isHistoryVisible}
          data={data}
          ref={bottomSearchMenu}
          onItemPress={onSearchItemPress}
          onTextChange={onTextChange}
          bottomInset={bottom}
        />
      </Portal>

      <AppMapButtons
        bottomMenuPosition={animatedValue}
        onShowLocationPress={focusToUserLocation}
        onSearchPress={() => bottomSearchMenu.current?.show()}
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
