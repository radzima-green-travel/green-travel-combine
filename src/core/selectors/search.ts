import {selectAllCategoriesWithObjects} from './common';
import {createSelector} from 'reselect';
import {
  ICategoryWithExtendedObjects,
  IExtendedObjectWithCategoryData,
} from '../types';
import {IState} from 'core/store';
import {flattenCategories} from '../helpers';
import {filter, map, reduce, orderBy} from 'lodash';

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;
export const selectSearchHistory = (state: IState) =>
  orderBy(state.search.history, [({name}) => name.toLowerCase()], 'asc');

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

export const selectSearchResults = createSelector<
  IState,
  IExtendedObjectWithCategoryData[],
  string,
  IExtendedObjectWithCategoryData[]
>(selectFlattenObjects, selectSearchInputValue, (objects, inputValue) => {
  return orderBy(
    filter(objects, (object) =>
      object.name.toLowerCase().includes(inputValue.toLowerCase()),
    ),
    [({name}) => name.toLowerCase()],
    'asc',
  );
});
