import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ICategoryWithExtendedObjects,
  ICategory,
  IExtendedObjectWithCategoryData,
} from 'core/types';
import {flattenCategories} from '../helpers';
import {map, reduce} from 'lodash';

export const selectBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;

export const selectAllCategoriesWithObjects = createSelector<
  IState,
  ICategory[] | null,
  ICategoryWithExtendedObjects[] | null
>(
  (state) => state.home.data,
  (categories) => {
    if (!categories) {
      return null;
    }

    return categories;
  },
);

export const selectFlattenCategories = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[]
>(selectAllCategoriesWithObjects, (categories) => {
  if (!categories) {
    return [];
  }

  return flattenCategories(categories);
});

export const selectFlattenObjects = createSelector<
  IState,
  ICategoryWithExtendedObjects[],
  IExtendedObjectWithCategoryData[]
>(selectFlattenCategories, (flatCategories) => {
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
