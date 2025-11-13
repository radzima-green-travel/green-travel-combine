import { isLocationExist } from 'core/helpers';
import type { ObjectMap } from 'core/types';
import { compact, map } from 'lodash';

import { featureCollection, point } from '@turf/helpers';
import type { FeatureCollection, Geometry } from 'geojson';
import { MAP_PINS } from 'core/constants';

const createMarkerFromObject = (data: ObjectMap, iconPostfix: string = '') => {
  if (!isLocationExist(data)) {
    return null;
  }

  const { location } = data;
  return point(
    [location!.lon!, location!.lat!],
    {
      icon_image: `${data.category.icon}${iconPostfix}`,
      objectId: data.id,
    },
    { id: data.id },
  );
};

export const getMapMarkers = (objects: ObjectMap[]) => {
  const points = compact(map(objects, data => createMarkerFromObject(data)));

  return points.length ? featureCollection(points) : null;
};

export const createSelectedMarkerFromObject = (
  data: ObjectMap | null,
): FeatureCollection<Geometry, { icon_image: string; objectId: string }> => {
  return featureCollection(
    compact([
      data
        ? createMarkerFromObject(data, MAP_PINS.SELECTED_POSTFIX)
        : undefined,
    ]),
  );
};
