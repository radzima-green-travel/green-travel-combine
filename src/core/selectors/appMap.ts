import {createSelector} from 'reselect';
import {isEmpty, map, compact, some, forEach} from 'lodash';
import {
  FeatureCollection,
  featureCollection,
  point,
  Geometry,
} from '@turf/helpers';
import {
  IMapFilter,
  ObjectCategoryMapDTO,
  ObjectMap,
  ObjectMapDTO,
} from '../types';
import {IState} from 'core/store';
import {isLocationExist} from 'core/helpers';
import {selectAppLanguage} from './settingsSelectors';
import {
  getObjectFullAddress,
  translateAndProcessImagesForEntity,
} from 'core/transformators/common';
import {MAP_PINS} from '../constants';

export const selectAppMapRawObjects = (state: IState) =>
  state.appMap.appMapObjects;

export const selectAppMapObjects = createSelector(
  selectAppMapRawObjects,
  selectAppLanguage,
  (objects, locale) => {
    return map(objects, object => {
      return {
        ...translateAndProcessImagesForEntity(object, locale),
        address: getObjectFullAddress(object.addresses, locale),
      };
    });
  },
);

export const selectAppMapCategories = createSelector(
  selectAppMapRawObjects,
  selectAppLanguage,
  (objects, locale) => {
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
  },
);

export const selectMapFilters = createSelector(
  selectAppMapCategories,
  categories => {
    const mapFilters: IMapFilter[] = map(categories, category => {
      return {
        title: category.name,
        icon: category.icon,
        categoryId: category.id,
      };
    });

    return mapFilters;
  },
);

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
