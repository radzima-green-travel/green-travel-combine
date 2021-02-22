import {createSelector} from 'reselect';
import {filter, isEmpty} from 'lodash';
import {IState} from 'core/store';
import {ICategoryWithExtendedObjects, IBookmarksIds} from 'core/types';
import {selectAllCategoriesWithObjects, selectBookmarksIds} from './common';
import {filterDeepObjects, flattenCategories} from 'core/helpers';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  IBookmarksIds,
  ICategoryWithExtendedObjects[] | null
>(
  selectAllCategoriesWithObjects,
  selectBookmarksIds,
  (categories, bookmarksIds) => {
    if (!categories) {
      return null;
    }

    return filterDeepObjects(categories, ({_id}) => bookmarksIds.includes(_id));
  },
);

export const selectBookmarksCardsData = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectBookmarksCategories, (categories) => {
  return categories
    ? filter(flattenCategories(categories), ({objects}) => !isEmpty(objects))
    : null;
});
