import {createSelector} from 'reselect';
import {isEmpty, map, compact} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {DEFAULT_BOUNDS, MAP_PINS} from '../constants';
import {ICoordinates, IObject, IExtendedObjectWithCategoryData} from '../types';
import {CameraSettings} from '@react-native-mapbox-gl/maps';
import bbox from '@turf/bbox';
import {IState} from 'core/store';
import {selectFlattenObjects} from './common';

export const selectMapMarkers = createSelector<
  IState,
  IExtendedObjectWithCategoryData[],
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>
>(selectFlattenObjects, (objects) => {
  const points = compact(
    map(objects, (data) => {
      if (data.location && data.location.coordinates && data.icon) {
        const {location} = data;
        return point(
          location.coordinates,
          {
            icon_image: data.icon,
            data,
          },
          {id: location._id},
        );
      }
      return null;
    }),
  );

  return featureCollection(points);
});

export const selectMarker = createSelector<
  IExtendedObjectWithCategoryData | null,
  IExtendedObjectWithCategoryData | null,
  FeatureCollection<Geometry, {icon_image: string; data: IObject}>
>(
  (obj) => obj,
  (data) => {
    return featureCollection(
      compact([
        data
          ? point(
              data.location.coordinates,
              {
                icon_image: `${data.icon}${MAP_PINS.SELECTED_POSTFIX}`,
                data,
              },
              {id: data.location._id},
            )
          : undefined,
      ]),
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
