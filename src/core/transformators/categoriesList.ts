import {map, mapValues, orderBy} from 'lodash';
import {
  convertShortCategoryToCardItem,
  translateAndProcessImagesForEntity,
} from './common';
import {ProcessedCategoriesListsById, SupportedLocales} from 'core/types';
import {CategoriesListsById} from 'core/types/categoriesList';

export const getProcessedCategoriesLists = (
  categoriesLists: CategoriesListsById,
  locale: SupportedLocales | null,
): ProcessedCategoriesListsById =>
  mapValues(categoriesLists, category => ({
    ...category,
    data: map(category.data, data =>
      translateAndProcessImagesForEntity(data, locale),
    ),
  }));

export const prepareCategoriesListData = (
  categoryId: string,
  categoriesLists: ProcessedCategoriesListsById,
) => {
  const list = categoriesLists[categoryId];

  if (!list) {
    return {
      data: [],
      nextToken: null,
      total: 0,
      requestedItemsCount: 0,
    };
  }

  const sortedCategories = orderBy(list.data, ['index'], ['asc']);

  return {
    ...list,
    data: map(sortedCategories, convertShortCategoryToCardItem),
  };
};
