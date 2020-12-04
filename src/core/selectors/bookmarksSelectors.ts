import {createSelector} from 'reselect';

import {IState} from 'core/store';
import {ICategoryWithExtendedObjects} from 'core/types';
import {selectAllCategoriesWithObjects} from './common';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectAllCategoriesWithObjects, (categories) => {
  if (!categories) {
    return null;
  }

  return categories.map((category) => {
    return {
      ...category,
      objects: category.objects.filter(({isFavorite}) => isFavorite),
    };
  });
});
