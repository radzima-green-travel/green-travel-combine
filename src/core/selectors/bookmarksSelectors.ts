import {createSelector} from 'reselect';
import {filter, isEmpty} from 'lodash';
import {IState} from 'core/store';
import {ICategoryWithExtendedObjects} from 'core/types';
import {selectAllCategoriesWithObjects} from './common';
import {filterDeepObjects, flattenCategories} from 'core/helpers';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectAllCategoriesWithObjects, (categories) => {
  if (!categories) {
    return null;
  }

  return filterDeepObjects(categories, ({isFavorite}) => isFavorite);
});

export const selectBookmarksCardsData = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectBookmarksCategories, (categories) => {
  return categories
    ? filter(flattenCategories(categories), ({objects}) => !isEmpty(objects))
    : null;
});
