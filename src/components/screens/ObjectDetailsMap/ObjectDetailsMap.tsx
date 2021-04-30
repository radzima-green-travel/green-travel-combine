import {ClusterMap, ClusterMapShape, Icon, Portal} from 'atoms';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {InteractionManager, View} from 'react-native';
import MapBox from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {
  selectIsDirectionShowed,
  selectMapDirection,
  selectMapDirectionDistance,
  selectMapMarkersObjectDetails,
  selectTransformedData,
} from 'core/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  useDarkStatusBar,
  useFocusToUserLocation,
  useObject,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {
  ObjectDetailsMapBottomMenu,
  ObjectDetailsMapBottomMenuRef,
  ObjectDetailsMapButtons,
  BackCircleButton,
  ObjectDetailsMapCallout,
} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'assets';

import {mapService} from 'services/MapService';
import Animated from 'react-native-reanimated';
import {IObject} from 'core/types';
import {
  clearObjectDetailsMapDirection,
  setObjectDetailsMapObjects,
  showObjectDetailsMapDirectionRequest,
} from 'core/reducers';
import {showLocation} from 'react-native-map-link';
import {filter} from 'lodash';
import {layersStyles} from './styles';

export const ObjectDetailsMap = ({route}: IProps) => {
  const {t} = useTranslation('objectDetails');
  const {objectId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const bottomMenu = useRef<ObjectDetailsMapBottomMenuRef>(null);
  const [selectedOject, setSelectedObject] = useState<IObject | null>(null);

  const {bottom, top} = useSafeAreaInsets();
  const data = useObject(objectId);
  useDarkStatusBar();
  const dispatch = useDispatch();
  const isDirectionShowed = useSelector(selectIsDirectionShowed);
  const direction = useSelector(selectMapDirection);
  const distance = useSelector(selectMapDirectionDistance);
  const markers = useSelector(selectMapMarkersObjectDetails);
  const transforedData = useSelector(selectTransformedData);

  const {
    focusToUserLocation,
    getUserLocation,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const bounds = useMemo(() => {
    if (data) {
      const paddings = {
        bottom: 220 + bottom,
        top: 30 + top,
      };

      if (data.area) {
        return mapService.getBoundsFromGeoJSON(data.area, paddings);
      }

      if (data.routes) {
        return mapService.getBoundsFromGeoJSON(data.routes, paddings);
      }

      return null;
    }
    return null;
  }, [bottom, data, top]);

  useOnRequestSuccess(showObjectDetailsMapDirectionRequest, () => {
    const directionBounds = mapService.getBoundsFromGeoJSON(direction, {
      bottom: 250 + bottom,
    });
    camera.current?.fitBounds(...directionBounds);
  });

  const loading = useRequestLoading(showObjectDetailsMapDirectionRequest);

  const onMenuButtonPress = useCallback(
    async (obj: IObject) => {
      const {location, name} = obj;
      const point = [location.lon, location.lat];

      if (isDirectionShowed) {
        showLocation({
          latitude: location.lat,
          longitude: location.lon,
          title: name,
          alwaysIncludeGoogle: true,
          dialogTitle: t('actionSheetTitle'),
          dialogMessage: name,
          cancelText: t('cancel'),
        });
      } else {
        const userLocation = await getUserLocation();
        dispatch(
          showObjectDetailsMapDirectionRequest({from: userLocation, to: point}),
        );
      }
    },
    [dispatch, getUserLocation, isDirectionShowed, t],
  );

  const showMarkers = useCallback(() => {
    if (transforedData && data) {
      const objects = filter(
        Object.values(transforedData.objectsMap),
        ({id}) => id !== data.id,
      );
      dispatch(setObjectDetailsMapObjects(objects));
    }
  }, [data, dispatch, transforedData]);

  useEffect(() => {
    if (data) {
      InteractionManager.runAfterInteractions(() => {
        bottomMenu.current?.show();
      });
    }
  }, [data]);

  const animatedValue = useMemo(() => new Animated.Value(1), []);

  const onBackPress = useCallback(() => {
    bottomMenu.current?.hide();
    dispatch(clearObjectDetailsMapDirection());
  }, [dispatch]);

  const onMarkerPress = useCallback((object, zoomLevel) => {
    const coordinates = [object.location.lon, object.location.lat];
    camera.current?.setCamera({
      centerCoordinate: coordinates,
      zoomLevel: zoomLevel,
      animationDuration: 500,
    });
    setSelectedObject(object);
  }, []);

  const onMapPress = useCallback(() => {
    setSelectedObject(null);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ClusterMap
        onPress={onMapPress}
        onShapePress={onMarkerPress}
        bounds={bounds}
        ref={camera}>
        <ClusterMapShape markers={markers} />
        {selectedOject ? (
          <MapBox.PointAnnotation
            id={'selectedObjectCallout'}
            anchor={{x: 0.05, y: 1.8}}
            coordinate={[
              selectedOject.location.lon,
              selectedOject.location.lat,
            ]}>
            <ObjectDetailsMapCallout />
          </MapBox.PointAnnotation>
        ) : null}
        {data ? (
          <MapBox.PointAnnotation
            id="ObjectDetailsMapPin"
            coordinate={[data?.location.lon, data?.location.lat]}>
            <Icon name="objectPin" width={32} height={32} />
          </MapBox.PointAnnotation>
        ) : null}
        {userLocationProps.visible ? (
          <MapBox.UserLocation minDisplacement={10} {...userLocationProps} />
        ) : null}

        {direction ? (
          <MapBox.ShapeSource id="directionSource" shape={direction}>
            <MapBox.LineLayer
              id="directionFill"
              style={layersStyles.direction}
            />
          </MapBox.ShapeSource>
        ) : null}

        {data?.area ? (
          <MapBox.ShapeSource id="area" shape={data?.area}>
            <MapBox.FillLayer
              id="areaFill"
              style={{fillColor: COLORS.apple, fillOpacity: 0.5}}
            />
            <MapBox.LineLayer
              id="areaStroke"
              style={{lineColor: COLORS.forestGreen}}
            />
          </MapBox.ShapeSource>
        ) : null}

        {data?.routes ? (
          <MapBox.ShapeSource id="routeSource" shape={data?.routes}>
            <MapBox.LineLayer id="routeFill" style={layersStyles.route} />
          </MapBox.ShapeSource>
        ) : null}
      </ClusterMap>
      <ObjectDetailsMapButtons
        bottomMenuPosition={animatedValue}
        onShowLocationPress={focusToUserLocation}
        botttomInset={bottom}
      />
      <Portal>
        <ObjectDetailsMapBottomMenu
          animatedPosition={animatedValue}
          data={data}
          distance={distance}
          ref={bottomMenu}
          onHideEnd={() => {}}
          bottomInset={bottom}
          onButtonPress={onMenuButtonPress}
          loading={loading}
          isDirectionShowed={isDirectionShowed}
          onOpenEnd={showMarkers}
        />
      </Portal>
      <BackCircleButton onPress={onBackPress} />
    </View>
  );
};
