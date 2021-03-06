import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {
  ITransformedCategory,
  ITransformedData,
  IObejctsMap,
  ICategoriesMap,
} from 'core/types';
import {isEmpty, map, shuffle} from 'lodash';
import {transformQueryData} from 'core/helpers';
import {ListMobileDataQuery} from 'api/graphql/types';
import {languageService} from 'services/LanguageService';

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
  data =>
    data
      ? transformQueryData(data, languageService.getCurrentLanguage())
      : null,
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
      children: category.children.filter(id => {
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
