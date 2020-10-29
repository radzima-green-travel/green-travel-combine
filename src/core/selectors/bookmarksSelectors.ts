import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithObjects,
  ICategory,
  IBookmarksIds,
  IObject,
  IExtendedObject,
} from 'core/types';
import {includes, map, omit, reduce} from 'lodash';

export const selectBookmarksCategories = createSelector<
  IState,
  ICategoryWithObjects[] | null,
  ICategory[] | null
>(
  (state) => state.home.data,
  (data) =>
    data ? map(data, (category) => omit(category, ['objects'])) : null,
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
    return reduce(
      objects,
      (acc, object) => {
        const bookmarksForCategory = bookmarksIds?.[object.category];
        const isFavorite = includes(bookmarksForCategory, object._id);

        if (isFavorite) {
          acc.push({
            ...object,
            isFavorite,
          });
        }
        return acc;
      },
      [] as IExtendedObject[],
    );
  },
);
