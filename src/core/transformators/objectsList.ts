import {
  ObjectsListQueryParams,
  ProcessedObjectsListsById,
  SupportedLocales,
} from 'core/types';
import { map, mapValues } from 'lodash';
import {
  convertShortObjectToCardItem,
  translateAndProcessImagesForEntity,
} from 'core/transformators/common';
import { ObjectListFilters, ObjectsListsById } from 'core/types/objectsList';

export const getProcessedObjectsLists = (
  objectsLists: ObjectsListsById,
  locale: SupportedLocales | null,
): ProcessedObjectsListsById =>
  mapValues(objectsLists, objectsList => ({
    ...objectsList,
    data: map(objectsList.data, item =>
      translateAndProcessImagesForEntity(item, locale),
    ),
  }));

export const prepareObjectsListData = (
  objectsLists: ProcessedObjectsListsById,
  categoryId: string,
) => {
  const list = objectsLists[categoryId];

  if (!list) {
    return {
      data: [],
      nextToken: null,
      total: 0,
    };
  }

  return {
    ...list,
    data: list.data.map(convertShortObjectToCardItem),
  };
};

export const createObjectListQueryParams = (
  appliedFilters: ObjectListFilters,
  nextToken?: string,
): ObjectsListQueryParams => {
  const { objectsIds, categoryId, ...flags } = appliedFilters;

  const objectsIdsDefined = !!objectsIds?.length;

  const filter: ObjectsListQueryParams['filter'] = flags;

  if (objectsIdsDefined) {
    filter.ids = objectsIds;
  } else if (categoryId) {
    filter.categories = [categoryId];
  }

  return {
    sort: { direction: 'asc', field: 'name' },
    limit: objectsIdsDefined ? objectsIds.length : 10,
    filter,
    ...(!objectsIdsDefined && nextToken && { nextToken }),
  };
};
