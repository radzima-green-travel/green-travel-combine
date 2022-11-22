import {useCallback, useMemo, useRef} from 'react';
import MapBox, {RegionPayload} from '@react-native-mapbox-gl/maps';
import {selectIsDirectionShowed} from 'core/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  useBottomMenu,
  useFocusToUserLocation,
  useObject,
  useRequestLoading,
  useTranslation,
  useTransformedData,
} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IBounds, IObject} from 'core/types';
import {showLocation} from 'react-native-map-link';
import {mapService} from 'services/MapService';
import {showObjectDetailsMapDirectionRequest} from 'core/reducers';

import {
  Feature,
  featureCollection,
  MultiPolygon,
  multiPolygon,
  LineString,
  lineString,
  Point,
  point,
} from '@turf/helpers';
import {useRoute} from '@react-navigation/native';
import {ObjectDetailsMapScreenRouteProps} from '../types';

export const useObjectDetailsMap = () => {
  const {t} = useTranslation('objectDetails');
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsMapScreenRouteProps>();

  const {openMenu, closeMenu, ...menuProps} = useBottomMenu();

  const data = useObject(objectId);
  const {getObject} = useTransformedData();

  const map = useRef<MapBox.MapView>(null);
  const camera = useRef<MapBox.Camera>(null);

  const dispatch = useDispatch();

  const centerCoordinate = useMemo(() => {
    if (data) {
      return [data.location?.lon!, data.location?.lat!];
    }

    return null;
  }, [data]);

  const isDirectionShowed = useSelector(selectIsDirectionShowed);

  const {
    focusToUserLocation,
    setIsUserLocationFocused,
    isUserLocationFocused,
    getUserLocation,
    userLocation,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const {loading} = useRequestLoading(showObjectDetailsMapDirectionRequest);

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

  const {bottom, top} = useSafeAreaInsets();

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

  const onBackPress = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return {
    bottom,
    top,
    camera,
    data,
    openMenu,
    dispatch,
    unfocusUserLocation,
    onMarkerPress,
    bounds,
    map,
    userLocationProps,
    menuProps,
    onShowLocationPress,
    isUserLocationFocused,
    onMenuButtonPress,
    loading,
    isDirectionShowed,
    onBackPress,
  };
};
