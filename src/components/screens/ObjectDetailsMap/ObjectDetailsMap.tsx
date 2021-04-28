import {ClusterMap, Icon, Portal} from 'atoms';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {InteractionManager, View} from 'react-native';
import MapBox from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {
  createMarkerFromObject,
  selectIsDirectionShowed,
  selectMapDirection,
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
} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'assets';

import {mapService} from 'services/MapService';
import Animated from 'react-native-reanimated';
import {IObject} from 'core/types';
import {
  clearObjectDetailsMapDirection,
  showObjectDetailsMapDirectionRequest,
} from 'core/reducers';
import {showLocation} from 'react-native-map-link';

const layerStyles = {
  origin: {
    circleRadius: 5,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'white',
  },
  route: {
    lineColor: 'black',
    lineCap: MapBox.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
    lineDasharray: [2, 4],
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  },
};
type SelectedMarker = ReturnType<typeof createMarkerFromObject>;

export const ObjectDetailsMap = ({route}: IProps) => {
  const {t} = useTranslation('objectDetails');
  const {objectId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const bottomMenu = useRef<ObjectDetailsMapBottomMenuRef>(null);
  const {bottom} = useSafeAreaInsets();
  const data = useObject(objectId);
  useDarkStatusBar();
  const dispatch = useDispatch();
  const isDirectionShowed = useSelector(selectIsDirectionShowed);
  const direction = useSelector(selectMapDirection);

  const {
    focusToUserLocation,
    getUserLocation,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const bounds = useMemo(() => {
    if (data && data.area) {
      return mapService.getBoundsFromGeoJSON(data.area, {bottom: 220 + bottom});
    }
    return null;
  }, [bottom, data]);

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
        console.log('here');

        const userLocation = await getUserLocation();
        console.log(userLocation);
        dispatch(
          showObjectDetailsMapDirectionRequest({from: userLocation, to: point}),
        );
      }
    },
    [dispatch, getUserLocation, isDirectionShowed, t],
  );

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

  return (
    <View style={{flex: 1}}>
      <ClusterMap
        onPress={() => {}}
        onShapePress={() => {}}
        bounds={bounds}
        ref={camera}>
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
          <MapBox.ShapeSource id="routeSource" shape={direction}>
            <MapBox.LineLayer id="routeFill" style={layerStyles.route} />
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
          ref={bottomMenu}
          onHideEnd={() => {}}
          bottomInset={bottom}
          onButtonPress={onMenuButtonPress}
          loading={loading}
          isDirectionShowed={isDirectionShowed}
        />
      </Portal>
      <BackCircleButton onPress={onBackPress} />
    </View>
  );
};
