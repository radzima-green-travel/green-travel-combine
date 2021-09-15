import {ClusterMap, BottomMenu} from 'atoms';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {InteractionManager, StyleProp, View} from 'react-native';
import MapBox, {
  FillLayerStyle,
  LineLayerStyle,
  SymbolLayerStyle,
} from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {
  selectIsDirectionShowed,
  selectMapDirection,
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
  useTransformedData,
  useObjectBelongsToSubtitle,
  useBottomMenu,
} from 'core/hooks';
import {
  ObjectDetailsMapBottomMenu,
  ObjectDetailsMapButtons,
  BackCircleButton,
} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mapService} from 'services/MapService';

import {IObject} from 'core/types';
import {
  clearObjectDetailsMapDirection,
  showObjectDetailsMapDirectionRequest,
} from 'core/reducers';
import {showLocation} from 'react-native-map-link';
import {themeLayerStyles} from './styles';
import {MAP_BOTTOM_MENU_HEIGHT} from 'core/constants';

const mapPin = require('assets/images/map-pin.png');

const images = {
  mapPin,
};

export const ObjectDetailsMap = ({route}: IProps) => {
  const layersStyles = useThemeStyles(themeLayerStyles, {
    disableStyleSheet: true,
  });
  const theme = useColorScheme();
  const {t} = useTranslation('objectDetails');
  const {objectId} = route.params;
  const camera = useRef<MapBox.Camera>(null);
  const {openMenu, closeMenu, ...menuProps} = useBottomMenu();

  const {bottom, top} = useSafeAreaInsets();
  const data = useObject(objectId);
  const {getObject} = useTransformedData();
  const dataShapeSource = useMemo(
    () => (data ? createMarkerFromDetailsObject(data) : data),
    [data],
  );

  const belongsToSubtitle = useObjectBelongsToSubtitle(
    data?.belongsTo?.[0]?.objects,
  );

  useStatusBar(theme);

  const dispatch = useDispatch();
  const isDirectionShowed = useSelector(selectIsDirectionShowed);
  const direction = useSelector(selectMapDirection);

  const {focusToUserLocation, getUserLocation, ...userLocationProps} =
    useFocusToUserLocation(camera);

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

  const centerCoordinate = useMemo(() => {
    if (data) {
      return [data.location?.lon!, data.location?.lat!];
    }

    return null;
  }, [data]);

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
      const point = [location!.lon!, location!.lat!];

      if (isDirectionShowed) {
        showLocation({
          latitude: location!.lat!,
          longitude: location!.lon!,
          googleForceLatLon: true,
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

  useEffect(() => {
    if (data) {
      InteractionManager.runAfterInteractions(() => {
        console.log('opem');
        openMenu();
      });
    }
  }, [data, openMenu]);

  const onBackPress = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    return () => {
      dispatch(clearObjectDetailsMapDirection());
    };
  }, [dispatch]);

  const boundsToArea = useCallback(() => {
    if (bounds) {
      camera.current?.fitBounds(...bounds);
    }
  }, [bounds]);

  const onMarkerPress = useCallback(
    (id: string | null) => {
      if (id) {
        const object = getObject(id);
        if (object) {
          if (data?.area) {
            boundsToArea();
          } else {
            const coordinates = [object.location?.lon!, object.location?.lat!];
            camera.current?.setCamera({
              centerCoordinate: coordinates,
              zoomLevel: 8,
              animationDuration: 500,
            });
          }
        }
      } else {
        boundsToArea();
      }
      openMenu();
    },
    [boundsToArea, data?.area, getObject, openMenu],
  );

  return (
    <View style={{flex: 1}}>
      <ClusterMap
        centerCoordinate={centerCoordinate}
        onShapePress={onMarkerPress}
        bounds={bounds}
        ref={camera}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation minDisplacement={10} {...userLocationProps} />
        ) : null}

        {direction ? (
          <MapBox.ShapeSource id="directionSource" shape={direction}>
            <MapBox.LineLayer
              id="directionFill"
              style={layersStyles.direction as StyleProp<LineLayerStyle>}
            />
          </MapBox.ShapeSource>
        ) : null}

        {data?.area ? (
          <MapBox.ShapeSource id="area" shape={data?.area}>
            <MapBox.FillLayer
              id="areaFill"
              style={layersStyles.area as StyleProp<FillLayerStyle>}
            />
            <MapBox.LineLayer
              id="areaStroke"
              style={layersStyles.areaStroke as StyleProp<LineLayerStyle>}
            />
          </MapBox.ShapeSource>
        ) : null}

        {data?.routes ? (
          <MapBox.ShapeSource id="routeSource" shape={data?.routes}>
            <MapBox.LineLayer
              id="routeFill"
              style={layersStyles.route as StyleProp<LineLayerStyle>}
            />
          </MapBox.ShapeSource>
        ) : null}

        {dataShapeSource ? (
          <>
            <MapBox.Images images={images} />
            <MapBox.ShapeSource id="objectPinSource" shape={dataShapeSource}>
              <MapBox.SymbolLayer
                id="singlePoint"
                style={
                  layersStyles.objectDetailsPin as StyleProp<SymbolLayerStyle>
                }
              />
            </MapBox.ShapeSource>
          </>
        ) : null}
      </ClusterMap>
      <ObjectDetailsMapButtons
        bottomMenuPosition={menuProps.animatedPosition}
        onShowLocationPress={focusToUserLocation}
        botttomInset={bottom}
      />
      <BottomMenu menuHeight={MAP_BOTTOM_MENU_HEIGHT + bottom} {...menuProps}>
        <ObjectDetailsMapBottomMenu
          data={data}
          belongsToSubtitle={belongsToSubtitle}
          onHideEnd={() => {}}
          bottomInset={bottom}
          onButtonPress={onMenuButtonPress}
          loading={loading}
          isDirectionShowed={isDirectionShowed}
        />
      </BottomMenu>
      <BackCircleButton onPress={onBackPress} />
    </View>
  );
};
