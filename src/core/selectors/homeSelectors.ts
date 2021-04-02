import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ITransformedCategory,
  ITransformedData,
  IObejctsMap,
  ICategoriesMap,
} from 'core/types';

export const selectTransformedData = (state: IState) =>
  state.home.transformedData;

export const selectHomeData = createSelector<
  IState,
  ITransformedData | null,
  ITransformedCategory[] | null
>(selectTransformedData, transformedData => {
  if (!transformedData) {
    return null;
  }
  return transformedData.categories;
});

export const selectObjectsMap = createSelector<
  IState,
  ITransformedData | null,
  IObejctsMap | null
>(selectTransformedData, transformedData => {
  return transformedData ? transformedData.objectsMap : null;
});

export const selectCategoriesMap = createSelector<
  IState,
  ITransformedData | null,
  ICategoriesMap | null
>(selectTransformedData, transformedData => {
  return transformedData ? transformedData.categoriesMap : null;
});
