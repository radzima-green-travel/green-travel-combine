import {isLocationExist} from 'core/helpers';
import type {
  ObjectCategoryMapDTO,
  ObjectMapDTO,
  ObjectCategoryMap,
  ObjectMap,
  IMapFilter,
} from 'core/types';
import {compact, forEach, isEmpty, map, some} from 'lodash';
import {
  getObjectFullAddress,
  translateAndProcessImagesForEntity,
} from './common';
import {SupportedLocales} from 'core/types';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {MAP_PINS} from 'core/constants';

export function prepareAppMapObects(
  objects: ObjectMapDTO[],
  locale: SupportedLocales | null,
): ObjectMap[] {
  return map(objects, object => {
    return {
      ...translateAndProcessImagesForEntity(object, locale),
      address: getObjectFullAddress(object.addresses, locale),
    };
  });
}

export function prepareAppMapCategories(
  objects: ObjectMapDTO[],
  locale: SupportedLocales | null,
): ObjectCategoryMap[] {
  const categoriesMap = new Map<string, ObjectCategoryMapDTO>();

  forEach(objects, object => {
    if (object.category && isLocationExist(object)) {
      const {category} = object;
      if (!categoriesMap.has(category.id)) {
        categoriesMap.set(category.id, category);
      }
    }
  });
  const categories = [...categoriesMap.values()];
  return map(categories, category => {
    return translateAndProcessImagesForEntity(category, locale);
  });
}

export function prepareAppMapFilters(
  categories: ObjectCategoryMap[],
): IMapFilter[] {
  const mapFilters: IMapFilter[] = map(categories, category => {
    return {
      title: category.name,
      icon: category.icon,
      categoryId: category.id,
    };
  });

  return mapFilters;
}

export const getMapMarkers = (objects: ObjectMap[], filters: IMapFilter[]) => {
  const points = compact(
    map(objects, data => {
      const isMatchToFilters =
        isEmpty(filters) ||
        some(filters, ({categoryId}) => categoryId === data.category.id);

      if (isLocationExist(data) && isMatchToFilters) {
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

  return points ? featureCollection(points) : null;
};

export const createMarkerFromObject = (
  data: ObjectMapDTO | null,
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
