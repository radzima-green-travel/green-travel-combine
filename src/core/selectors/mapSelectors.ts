import {createSelector} from 'reselect';
import {map, isEmpty, reduce} from 'lodash';
import {selectHomeData} from './homeSelectors';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
  Feature,
  Point,
} from '@turf/helpers';
import {MAP_PINS, DEFAULT_BOUNDS} from '../constants';
import {ICoordinates, ICategoryWithObjects, IObject} from '../types';
import {CameraSettings} from '@react-native-mapbox-gl/maps';
import bbox from '@turf/bbox';
import {IState} from 'core/store';

export const selectMapMarkers = createSelector<
  IState,
  IObject | null,
  ICategoryWithObjects[] | null,
  IObject | null,
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>[]
>(
  selectHomeData,
  (_state, selected) => selected,
  (categories, selected) => {
    return map(categories, ({objects}) => {
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
                    selected?._id === data._id ? MAP_PINS.SELECTED_POSTFIX : ''
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

      return featureCollection(points);
    });
  },
);

export const selectBounds = createSelector<
  IState,
  ReturnType<typeof selectMapMarkers>,
  CameraSettings['bounds']
>(selectMapMarkers, (markers) => {
  const allMarkers = markers[0];

  if (isEmpty(allMarkers)) {
    return DEFAULT_BOUNDS;
  }

  const [minLng, minLat, maxLng, maxLat] = bbox(allMarkers);

  const southWest: ICoordinates = [minLng, minLat];
  const northEast: ICoordinates = [maxLng, maxLat];

  return {
    ne: northEast,
    sw: southWest,
    paddingLeft: 30,
    paddingRight: 30,
  };
});
