import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithExtendedObjects,
  ICategory,
  IBookmarksIds,
  IExtendedObjectWithCategoryData,
} from 'core/types';
import {addIsFavoriteToObjects, flattenCategories} from '../helpers';
import {map, reduce} from 'lodash';

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

export const selectFlattenObjects = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  IExtendedObjectWithCategoryData[]
>(selectAllCategoriesWithObjects, (categories) => {
  if (!categories) {
    return [];
  }
  const flatCategories = flattenCategories(categories);
  return reduce(
    flatCategories,
    (acc, next) => {
      return [
        ...acc,
        ...map(next.objects, (object) => ({
          ...object,
          categoryName: next.name,
          icon: next.icon,
        })),
      ];
    },
    [] as IExtendedObjectWithCategoryData[],
  );
});
