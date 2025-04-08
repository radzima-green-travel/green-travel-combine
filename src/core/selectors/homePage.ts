import {IState} from 'core/store';
import {
  prepareHomePageData,
  preparePlaceOfTheWeekObject,
  prepareRandomObject,
} from 'core/transformators/homePage';
import {createSelector} from 'reselect';
import {selectAppLanguage} from './settingsSelectors';
import {translateAndProcessImagesForEntity} from 'core/transformators/common';
import {map} from 'lodash';

export const selectHomePageRawCategoriesList = (state: IState) =>
  state.homePage.categoriesList;

export const selectHomePageRawPlaceOfTheWeek = (state: IState) =>
  state.homePage.placeOfTheWeek;

export const selectHomePagePlaceOfTheWeek = createSelector(
  selectHomePageRawPlaceOfTheWeek,
  selectAppLanguage,
  (placeOfTheWeek, locale) => {
    return preparePlaceOfTheWeekObject(placeOfTheWeek, locale);
  },
);

export const selectHomePageCategoriesList = createSelector(
  selectHomePageRawCategoriesList,
  selectAppLanguage,
  (categoriesList, locale) => {
    return map(categoriesList, category => {
      return translateAndProcessImagesForEntity(category, locale);
    });
  },
);

export const selectHomePageData = createSelector(
  selectHomePageCategoriesList,
  categoriesList => {
    return prepareHomePageData(categoriesList);
  },
);

export const selectRawRandomObjectList = (state: IState) =>
  state.homePage.randomObjects;
export const selectRandomObjectList = createSelector(
  selectRawRandomObjectList,
  selectAppLanguage,
  (randomObjects, locale) => {
    return prepareRandomObject(randomObjects, locale);
  },
);
