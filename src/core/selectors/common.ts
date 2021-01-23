import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithExtendedObjects,
  ICategory,
  IBookmarksIds,
} from 'core/types';
import {addIsFavoriteToObjects} from '../helpers';

export const selectBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;

export const selectAllCategoriesWithObjects = createSelector<
  IState,
  ICategory[] | null,
  IBookmarksIds,
  ICategoryWithExtendedObjects[] | null
>(
  (state) => state.home.data,
  selectBookmarksIds,
  (categories, bookmarksIds) => {
    if (!categories) {
      return null;
    }

    return addIsFavoriteToObjects(categories, bookmarksIds);
  },
);
