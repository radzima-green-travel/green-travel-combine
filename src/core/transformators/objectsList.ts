import {ProcessedObjectsListsById, SupportedLocales} from 'core/types';
import {map, mapValues} from 'lodash';
import {
  convertShortObjectToCardItem,
  translateAndProcessImagesForEntity,
} from 'core/transformators/common';
import {ObjectsListsById} from 'core/types/objectsList';

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
