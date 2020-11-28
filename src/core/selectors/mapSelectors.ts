import {createSelector} from 'reselect';
import {isEmpty, reduce} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
  Feature,
  Point,
} from '@turf/helpers';
import {MAP_PINS, DEFAULT_BOUNDS} from '../constants';
import {ICoordinates, ICategory, IObject} from '../types';
import {CameraSettings} from '@react-native-mapbox-gl/maps';
import bbox from '@turf/bbox';
import {IState} from 'core/store';

export const selectMapMarkers = createSelector<
  IState,
  string | null,
  ICategory[] | null,
  string | null,
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>
>(
  (state) => state.home.data,
  (_state, selectedId) => selectedId,
  (categories, selectedId) => {
    return featureCollection(
      reduce(
        categories,
        (pointsAcc, {objects}) => {
          const points = reduce(
            objects,
            (acc, data) => {
              if (data.location) {
                const {location} = data;
                return [
                  ...acc,
                  point(
                    location.coordinates,
                    {
                      icon_image: `${MAP_PINS.OBJECT}${
                        selectedId === data._id ? MAP_PINS.SELECTED_POSTFIX : ''
                      }`,
                      data,
                    },
                    {id: location._id},
                  ),
                ];
              }
              return acc;
            },
            [] as Feature<
              Point,
              {
                icon_image: string;
                data: IObject;
              }
            >[],
          );

          return [...pointsAcc, ...points];
        },
        [] as Feature<
          Point,
          {
            icon_image: string;
            data: IObject;
          }
        >[],
      ),
    );
  },
);

export const selectBounds = createSelector<
  IState,
  ReturnType<typeof selectMapMarkers>,
  CameraSettings['bounds']
>(selectMapMarkers, (markers) => {
  if (isEmpty(markers.features)) {
    return DEFAULT_BOUNDS;
  }

  const [minLng, minLat, maxLng, maxLat] = bbox(markers);

  const southWest: ICoordinates = [minLng, minLat];
  const northEast: ICoordinates = [maxLng, maxLat];

  return {
    ne: northEast,
    sw: southWest,
    paddingLeft: 30,
    paddingRight: 30,
  };
});
