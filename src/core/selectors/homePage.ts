import {IState} from 'core/store';
import {
  prepareCategoriesListData,
  prepareHomePageData,
  prepareObjectsListData,
} from 'core/transformators/homePage';
import {createSelector} from 'reselect';
import {selectAppLanguage} from './settingsSelectors';
import {translateAndProcessImagesForEntity} from 'core/transformators/common';
import {map, mapValues} from 'lodash';

export const selectHomePageRawCategoriesList = (state: IState) =>
  state.homePage.categoriesList;

export const selectHomePageRawObjectsByCategory = (state: IState) =>
  state.homePage.objectsByCategory;

export const selectHomePageCategoriesList = createSelector(
  selectHomePageRawCategoriesList,
  selectAppLanguage,
  (categoriesList, locale) => {
    return map(categoriesList, category => {
      return translateAndProcessImagesForEntity(category, locale);
    });
  },
);

export const selectHomePageObjectsByCategory = createSelector(
  selectHomePageRawObjectsByCategory,
  selectAppLanguage,
  (objectsByCategory, locale) => {
    return mapValues(objectsByCategory, values => {
      return map(values, object =>
        translateAndProcessImagesForEntity(object, locale),
      );
    });
  },
);

export const selectHomePageData = createSelector(
  selectHomePageCategoriesList,
  selectHomePageObjectsByCategory,
  (categoriesList, objectsByCategories) => {
    return prepareHomePageData(categoriesList, objectsByCategories);
  },
);

export const selectCategoriesListsById = (state: IState) =>
  state.homePage.categoriesListsById;

export const selectCategoriesList = (categoryId: string) =>
  createSelector(
    selectCategoriesListsById,
    selectAppLanguage,
    (categoriesList, locale) => {
      const list = categoriesList[categoryId];
      const preparedList = prepareCategoriesListData(locale, list?.data);

      return {
        data: preparedList,
        nextToken: list?.nextToken,
        total: list?.total,
      };
    },
  );

export const selectObjectsListsById = (state: IState) =>
  state.homePage.objectsListsById;

export const selectObjectsList = (categoryId: string) =>
  createSelector(
    selectObjectsListsById,
    selectAppLanguage,
    (objectsList, locale) => {
      const list = objectsList[categoryId];
      const preparedList = prepareObjectsListData(locale, list?.data);

      return {
        data: preparedList,
        nextToken: list?.nextToken,
        total: list?.total,
      };
    },
  );
