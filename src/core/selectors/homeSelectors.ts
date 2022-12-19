import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ITransformedCategory,
  ITransformedData,
  IObejctsMap,
  ICategoriesMap,
  SupportedLocales,
} from 'core/types';
import {isEmpty, map, shuffle} from 'lodash';
import {transformQueryData} from 'core/helpers';
import {ListMobileDataQuery} from 'api/graphql/types';
import {selectAppLanguage} from './settingsSelectors';

export const selectIsUpdatesAvailable = (state: IState) =>
  state.home.isUpdatesAvailable;
export const selectHomeUpdatedData = (state: IState) => state.home.updatedData;
export const selectIsHomeDataExists = (state: IState) =>
  Boolean(state.home.currentData);

export const selectTransformedData = createSelector<
  IState,
  ListMobileDataQuery | null,
  ITransformedData | null
>(
  state => state.home.currentData,
  selectAppLanguage,
  (data: ListMobileDataQuery, language: SupportedLocales) =>
    data ? transformQueryData(data, language) : null,
);

export const selectHomeData = createSelector<
  IState,
  ITransformedData | null,
  ITransformedCategory[] | null
>(selectTransformedData, transformedData => {
  if (!transformedData) {
    return null;
  }
  return map(transformedData.categories, category => {
    return {
      ...category,
      objects: shuffle(category.objects).slice(0, 10),
      children: category.children.filter((id: string | number) => {
        return !isEmpty(transformedData.categoriesMap[id].objects);
      }),
    };
  });
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
