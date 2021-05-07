import {ClusterMap, Portal} from 'atoms';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {InteractionManager, View} from 'react-native';
import MapBox from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {
  selectIsDirectionShowed,
  selectMapDirection,
  selectMapDirectionDistance,
  // selectMapMarkersObjectDetails,
  // selectTransformedData,
  createMarkerFromDetailsObject,
} from 'core/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  useStatusBar,
  useFocusToUserLocation,
  useObject,
  useOnRequestSuccess,
  useRequestLoading,
  useThemeStyles,
  useTranslation,
  useColorScheme,
} from 'core/hooks';
import {
  ObjectDetailsMapBottomMenu,
  ObjectDetailsMapBottomMenuRef,
  ObjectDetailsMapButtons,
  BackCircleButton,
  // ObjectDetailsMapCallout,
} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mapService} from 'services/MapService';
import Animated from 'react-native-reanimated';
import {IObject} from 'core/types';
import {
  clearObjectDetailsMapDirection,
  // setObjectDetailsMapObjects,
  showObjectDetailsMapDirectionRequest,
} from 'core/reducers';
import {showLocation} from 'react-native-map-link';
// import {filter} from 'lodash';
import {themeLayerStyles} from './styles';
// import {isIOS} from 'services/PlatformService';

const mapPin = require('assets/images/map-pin.png');

const images = {
  mapPin,
};

export const ObjectDetailsMap = ({route}: IProps) => {
  // const [selectedOject, setSelectedObject] = useState<IObject | null>(null);
  // const markers = useSelector(selectMapMarkersObjectDetails);
  // const transforedData = useSelector(selectTransformedData);
  const layersStyles = useThemeStyles(themeLayerStyles, {
    disableStyleSheet: true,
  });
  const theme = useColorScheme();
  const {t} = useTranslation('objectDetails');
  const {objectId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const bottomMenu = useRef<ObjectDetailsMapBottomMenuRef>(null);

  const {bottom, top} = useSafeAreaInsets();
  const data = useObject(objectId);

  const dataShapeSource = useMemo(
    () => (data ? createMarkerFromDetailsObject(data) : data),
    [data],
  );

  useStatusBar(theme);

  const dispatch = useDispatch();
  const isDirectionShowed = useSelector(selectIsDirectionShowed);
  const direction = useSelector(selectMapDirection);
  const distance = useSelector(selectMapDirectionDistance);

  const {
    focusToUserLocation,
    getUserLocation,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const bounds = useMemo(() => {
    if (data) {
      const paddings = {
        bottom: 169 + bottom,
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
      bottom: 200 + bottom,
      top: 30 + top,
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
        if (userLocation) {
          dispatch(
            showObjectDetailsMapDirectionRequest({
              from: userLocation,
              to: point,
            }),
          );
        }
      }
    },
    [dispatch, getUserLocation, isDirectionShowed, t],
  );

  const showMarkers = useCallback(() => {
    // if (transforedData && data) {
    //   const objects = filter(
    //     Object.values(transforedData.objectsMap),
    //     ({id}) => id !== data.id,
    //   );
    //   dispatch(setObjectDetailsMapObjects(objects));
    // }
  }, []);

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

  // const onMarkerPress = useCallback((object, zoomLevel) => {
  // if (!isIOS) {
  //   setSelectedObject(null);
  // }
  // const coordinates = [object.location.lon, object.location.lat];
  // camera.current?.setCamera({
  //   centerCoordinate: coordinates,
  //   zoomLevel: zoomLevel,
  //   animationDuration: 500,
  // });
  // if (isIOS) {
  //   setSelectedObject(object);
  // } else {
  //   setTimeout(() => {
  //     setSelectedObject(object);
  //   }, 500);
  // }
  // }, []);

  // const onMapPress = useCallback(() => {
  //   setSelectedObject(null);
  // }, []);

  // const CalloutComponent = MapBox[isIOS ? 'PointAnnotation' : 'MarkerView'];

  const onMarkerPress = useCallback(
    (object: IObject, zoomLevel: number) => {
      if (bounds) {
        camera.current?.fitBounds(...bounds);
      } else {
        const coordinates = [object.location.lon, object.location.lat];
        camera.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: zoomLevel,
          animationDuration: 500,
        });
      }

      bottomMenu.current?.show();
    },
    [bounds],
  );

  return (
    <View style={{flex: 1}}>
      <ClusterMap onShapePress={onMarkerPress} bounds={bounds} ref={camera}>
        {/* <ClusterMapShape markers={markers} /> */}
        {/* {selectedOject ? (
          <CalloutComponent
            id={'selectedObjectCallout'}
            anchor={{x: 0.5, y: isIOS ? 1.8 : 1.15}}
            coordinate={[
              selectedOject.location.lon,
              selectedOject.location.lat,
            ]}>
            <ObjectDetailsMapCallout
              title={selectedOject.name}
              imageUri={selectedOject.cover}
            />
          </CalloutComponent>
        ) : null} */}

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
            <MapBox.FillLayer id="areaFill" style={layersStyles.area} />
            <MapBox.LineLayer id="areaStroke" style={layersStyles.areaStroke} />
          </MapBox.ShapeSource>
        ) : null}

        {data?.routes ? (
          <MapBox.ShapeSource id="routeSource" shape={data?.routes}>
            <MapBox.LineLayer id="routeFill" style={layersStyles.route} />
          </MapBox.ShapeSource>
        ) : null}

        {dataShapeSource ? (
          <>
            <MapBox.Images images={images} />
            <MapBox.ShapeSource id="objectPinSource" shape={dataShapeSource}>
              <MapBox.SymbolLayer
                id="singlePoint"
                style={layersStyles.objectDetailsPin}
              />
            </MapBox.ShapeSource>
          </>
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
