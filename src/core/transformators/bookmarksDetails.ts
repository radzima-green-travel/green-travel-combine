import {SupportedLocales} from 'core/types';
import {
  convertShortObjectToCardItem,
  translateAndProcessImagesForEntity,
} from 'core/transformators/common';
import {map, mapValues} from 'lodash';
import {
  BookmarksInitialObjectsDataState,
  ProcessedBookmarksInitialObjectsData,
  ProcessedBookmarksObjectsList,
  BookmarksObjectsListState,
} from 'core/types/bookmarksDetails';
import {IBookmarkItem} from 'core/types';

export const getProcessedBookmarksInitialObjectsData = (
  data: BookmarksInitialObjectsDataState,
  locale: SupportedLocales | null,
): ProcessedBookmarksInitialObjectsData => {
  return {
    objectsIds: data.objectsIds,
    objects: map(data.objects, item => ({
      id: item.id,
      category: translateAndProcessImagesForEntity(item.category, locale),
    })),
  };
};

export const getBookmarksCategories = (
  data: ProcessedBookmarksInitialObjectsData,
) => {
  const result: IBookmarkItem[] = [];

  data.objects.forEach(object => {
    const objectsIds = data.objectsIds.filter(id => id === object.id);
    if (objectsIds.length > 0) {
      const existingCategory = result.find(
        item => item.categoryId === object.category.id,
      );

      if (!existingCategory) {
        result.push({
          categoryId: object.category.id,
          categoryName: object.category.name,
          objectsIds: objectsIds,
        });
      } else {
        existingCategory.objectsIds.push(...objectsIds);
      }
    }
  });

  return result;
};

export const getProcessedBookmarksObjectsList = (
  data: BookmarksObjectsListState,
  locale: SupportedLocales | null,
): ProcessedBookmarksObjectsList =>
  mapValues(data, objectsList =>
    map(objectsList, item => translateAndProcessImagesForEntity(item, locale)),
  );

export const getBookmarksObjectsList = (
  data: ProcessedBookmarksObjectsList,
  bookmarksIds: string[],
  id: string,
) => {
  const list = data[id];

  if (!list) {
    return [];
  }

  const filtered = list.filter((object: any) =>
    bookmarksIds.includes(object.id),
  );

  return filtered.map(convertShortObjectToCardItem);
};
