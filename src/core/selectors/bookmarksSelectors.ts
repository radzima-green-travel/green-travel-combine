import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithObjects,
  ICategory,
  IBookmarksIds,
  IObject,
  IExtendedObject,
} from 'core/types';
import {includes, map, omit} from 'lodash';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithObjects[] | null,
  ICategory[] | null
>(
  (state) => state.home.data,
  (data) => (data ? map(data, (category) => omit(category, ['items'])) : null),
);

export const selectSavedBookmarksIds = createSelector<
  IState,
  IBookmarksIds | null,
  IBookmarksIds | null
>(
  (state) => state.bookmarks.savedBookmarksIds,
  (savedBookmarksIds) => savedBookmarksIds,
);

export const selectSavedBookmarks = createSelector<
  IState,
  IObject[] | null,
  IBookmarksIds | null,
  IExtendedObject[] | null
>(
  (state) => state.bookmarks.data,
  selectSavedBookmarksIds,
  (objects, bookmarksIds) => {
    return map(objects, (object) => {
      const bookmarksForCategory = bookmarksIds?.[object.category];

      return {
        ...object,
        isFavorite: includes(bookmarksForCategory, object._id),
      };
    });
  },
);
