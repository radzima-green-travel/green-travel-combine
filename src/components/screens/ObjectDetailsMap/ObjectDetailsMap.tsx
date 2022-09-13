import {BottomMenu, ClusterMap} from 'atoms';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {InteractionManager, StyleProp, View} from 'react-native';
import MapBox, {
  FillLayerStyle,
  LineLayerStyle,
  RegionPayload,
  SymbolLayerStyle,
} from '@react-native-mapbox-gl/maps';
import {IProps} from './types';
import {
  createMarkerFromDetailsObject,
  selectIsDirectionShowed,
  selectMapDirection,
} from 'core/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  useBottomMenu,
  useColorScheme,
  useFocusToUserLocation,
  useObject,
  useObjectBelongsToSubtitle,
  useOnRequestSuccess,
  useRequestErrorAlert,
  useRequestLoading,
  useStatusBar,
  useThemeStyles,
  useTranslation,
  useTransformedData,
} from 'core/hooks';
import {
  BackCircleButton,
  ObjectDetailsMapButtons,
  ObjectDetailsMapBottomMenu,
} from 'molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mapService} from 'services/MapService';

import {IBounds, IObject} from 'core/types';
import {
  clearObjectDetailsMapDirection,
  showObjectDetailsMapDirectionRequest,
} from 'core/reducers';
import {showLocation} from 'react-native-map-link';
import {themeLayerStyles} from './styles';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {
  Feature,
  FeatureCollection,
  featureCollection,
  MultiPolygon,
  multiPolygon,
  LineString,
  lineString,
  Point,
  point,
} from '@turf/helpers';

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
  const map = useRef<MapBox.MapView>(null);

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

  const {
    focusToUserLocation,
    setIsUserLocationFocused,
    isUserLocationFocused,
    getUserLocation,
    userLocation,
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

  const centerCoordinate = useMemo(() => {
    if (data) {
      return [data.location?.lon!, data.location?.lat!];
    }

    return null;
  }, [data]);

  useRequestErrorAlert(showObjectDetailsMapDirectionRequest, 'common');

  useOnRequestSuccess(showObjectDetailsMapDirectionRequest, () => {
    const directionBounds = mapService.getBoundsFromGeoJSON(direction, {
      bottom: 200 + bottom,
      top: 30 + top,
    });
    camera.current?.fitBounds(...directionBounds);
  });

  const {loading} = useRequestLoading(showObjectDetailsMapDirectionRequest);

  useOnRequestSuccess(
    showObjectDetailsMapDirectionRequest,
    useCallback(() => {
      hapticFeedbackService.trigger('notificationSuccess');
    }, []),
  );

  const onMenuButtonPress = useCallback(
    async (obj: IObject) => {
      const {location, name} = obj;

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
      } else if (centerCoordinate) {
        const usrLocation = await getUserLocation();
        if (usrLocation) {
          dispatch(
            showObjectDetailsMapDirectionRequest({
              from: usrLocation,
              to: centerCoordinate,
            }),
          );
        }
      }
    },
    [centerCoordinate, dispatch, getUserLocation, isDirectionShowed, t],
  );

  useEffect(() => {
    if (data) {
      InteractionManager.runAfterInteractions(() => {
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

  const onShowLocationPress = async () => {
    let directionBounds: IBounds | null = null;

    let objectFeature: Feature<MultiPolygon | LineString | Point> | null = null;

    if (data?.area) {
      objectFeature = multiPolygon(data.area.coordinates);
    } else if (data?.routes) {
      objectFeature = lineString(data.routes.coordinates);
    } else if (centerCoordinate) {
      objectFeature = point(centerCoordinate);
    }

    if (userLocation && objectFeature) {
      directionBounds = mapService.getBoundsFromGeoJSON(
        featureCollection([objectFeature, point(userLocation)]),
        {
          bottom: 200 + bottom,
          top: 30 + top,
        },
      );
    }

    const currentZoom = (await map.current?.getZoom()) || null;

    focusToUserLocation(directionBounds, currentZoom);
  };

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
    <View style={{flex: 1}}>
      <ClusterMap
        attributionPosition={{bottom: 40, right: 30}}
        centerCoordinate={centerCoordinate}
        onRegionWillChange={unfocusUserLocation}
        onShapePress={onMarkerPress}
        bounds={bounds}
        ref={map}
        cameraRef={camera}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation
            renderMode="native"
            minDisplacement={10}
            {...userLocationProps}
          />
        ) : null}

        {direction ? (
          <MapBox.ShapeSource
            id="directionSource"
            shape={direction as unknown as LineString}>
            <MapBox.LineLayer
              id="directionFillBackground"
              belowLayerID="singlePoint"
              style={layersStyles.directionBackground as StyleProp<LineLayerStyle>}
            />
            <MapBox.LineLayer
              id="directionFill"
              belowLayerID="singlePoint"
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
            <MapBox.ShapeSource
              id="objectPinSource"
              shape={dataShapeSource as FeatureCollection<Point>}>
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
        onShowLocationPress={onShowLocationPress}
        isUserLocationFocused={isUserLocationFocused}
        botttomInset={bottom}
      />
      <BottomMenu {...menuProps}>
        <ObjectDetailsMapBottomMenu
          data={data}
          belongsToSubtitle={belongsToSubtitle}
          onHideEnd={() => {}}
          bottomInset={bottom}
          onButtonPress={onMenuButtonPress}
          loading={loading}
          isDirectionShowed={!!isDirectionShowed}
        />
      </BottomMenu>
      <BackCircleButton onPress={onBackPress} />
    </View>
  );
};
