import {createSelector} from 'reselect';

import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';

import {
  prepareAppMapCategories,
  prepareAppMapObects,
  prepareAppMapFilters,
} from '../transformators/appMap';

export const selectAppMapRawObjects = (state: IState) =>
  state.appMap.appMapObjects;

export const selectAppMapObjects = createSelector(
  selectAppMapRawObjects,
  selectAppLanguage,
  (objects, locale) => {
    return prepareAppMapObects(objects, locale);
  },
);

export const selectAppMapCategories = createSelector(
  selectAppMapRawObjects,
  selectAppLanguage,
  (objects, locale) => {
    return prepareAppMapCategories(objects, locale);
  },
);

export const selectMapFilters = createSelector(
  selectAppMapCategories,
  categories => {
    return prepareAppMapFilters(categories);
  },
);
