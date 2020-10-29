import {createSelector} from 'reselect';
import {map, isEmpty} from 'lodash';
import {selectHomeData} from './homeSelectors';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {MAP_PINS, DEFAULT_BOUNDS} from '../constants';
import {ICoordinates, ICategoryWithObjects, IObject} from '../types';
import {CameraSettings} from '@react-native-mapbox-gl/maps';
import bbox from '@turf/bbox';
import {IState} from 'core/store';

export const selectMapMarkers = createSelector<
  IState,
  ICategoryWithObjects[] | null,
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>
>(selectHomeData, (categories) => {
  return featureCollection(
    map(categories?.[0]?.objects, (data) => {
      const {location} = data;
      return point(
        location.coordinates,
        {
          icon_image: MAP_PINS.OBJECTS,
          data,
        },
        {id: location._id},
      );
    }),
  );
});

export const selectBounds = createSelector<
  IState,
  FeatureCollection,
  CameraSettings['bounds']
>(selectMapMarkers, (markers) => {
  if (isEmpty(markers)) {
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
