import {IState} from 'core/store';
import {prepareHomePageData} from 'core/transformators/homePage';
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
