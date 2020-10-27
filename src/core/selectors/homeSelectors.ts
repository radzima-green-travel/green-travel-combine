import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithExtendedObjects,
  ICategoryWithObjects,
  IBookmarksIds,
} from 'core/types';
import {filter, isEmpty, map, includes} from 'lodash';
import {selectSavedBookmarksIds} from './bookmarksSelectors';

export const selectAllCategoriesWithObjects = createSelector<
  IState,
  ICategoryWithObjects[] | null,
  IBookmarksIds | null,
  ICategoryWithExtendedObjects[] | null
>(
  (state) => state.home.data,
  selectSavedBookmarksIds,
  (categories, bookmarksIds) => {
    if (!categories) {
      return null;
    }

    return map(categories, (value) => {
      const bookmarksForCategory = bookmarksIds?.[value._id];
      return {
        ...value,
        items: map(value.items, (object) => {
          return {
            ...object,
            isFavorite: includes(bookmarksForCategory, object._id),
          };
        }),
      };
    });
  },
);

export const selectHomeData = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectAllCategoriesWithObjects, (data) =>
  filter(data, ({items}) => !isEmpty(items)),
);
