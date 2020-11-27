import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithExtendedObjects,
  ICategory,
  IBookmarksIds,
} from 'core/types';
import {map, includes} from 'lodash';

export const selectBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;

export const selectAllCategoriesWithObjects = createSelector<
  IState,
  ICategory[] | null,
  IBookmarksIds | null,
  ICategoryWithExtendedObjects[] | null
>(
  (state) => state.home.data,
  selectBookmarksIds,
  (categories, bookmarksIds) => {
    if (!categories) {
      return null;
    }

    return map(categories, (value) => {
      return {
        ...value,
        objects: map(value.objects, (object) => {
          return {
            ...object,
            isFavorite: includes(bookmarksIds, object._id),
          };
        }),
      };
    });
  },
);
