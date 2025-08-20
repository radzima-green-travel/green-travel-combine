import {isLocationExist} from 'core/helpers';
import type {ObjectMap} from 'core/types';
import {compact, map} from 'lodash';

import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {MAP_PINS} from 'core/constants';

export const getMapMarkers = (objects: ObjectMap[]) => {
  const points = compact(
    map(objects, data => {
      if (isLocationExist(data)) {
        const {location} = data;
        return point(
          [location!.lon!, location!.lat!],
          {
            icon_image: data.category.icon,
            objectId: data.id,
          },
          {id: data.id},
        );
      }
      return null;
    }),
  );

  return points.length ? featureCollection(points) : null;
};

export const createMarkerFromObject = (
  data: ObjectMap | null,
): FeatureCollection<Geometry, {icon_image: string; objectId: string}> => {
  return featureCollection(
    compact([
      data && isLocationExist(data)
        ? point(
            [data.location!.lon!, data.location!.lat!],
            {
              icon_image: `${data.category.icon}${MAP_PINS.SELECTED_POSTFIX}`,
              objectId: data.id,
            },
            {id: data.id},
          )
        : undefined,
    ]),
  );
};
