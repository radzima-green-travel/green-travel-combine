import {createSelector} from 'reselect';
import {SearchObject} from '../types';
import {IState} from 'core/store';
import {filter, map, reduce} from 'lodash';
import {isLocationExist} from 'core/helpers';
import {selectAppLanguage} from './settingsSelectors';
import {selectSearchHistoryObjectsIds} from './user';
import {extractLocaleSpecificValues} from 'core/transformators/common';

export const selectSearchNextToken = (state: IState) => state.search.nextToken;
export const selectSearchObjectsRawData = (state: IState) =>
  state.search.searchObjects;
export const selectSearchObjectsTotal = (state: IState) => state.search.total;

const selectSearchHistoryRawObjects = (state: IState) =>
  state.search.searchHistoryObjects;

export const selectSearchObjectsData = createSelector(
  selectSearchObjectsRawData,
  selectAppLanguage,
  (searchObjects, locale) =>
    map(searchObjects, object => {
      return {
        ...extractLocaleSpecificValues(object, locale),
        category: extractLocaleSpecificValues(object.category, locale),
      };
    }),
);

export const selectSearchHistoryObjects = createSelector(
  selectSearchHistoryRawObjects,
  selectAppLanguage,
  (searchObjects, locale) =>
    map(searchObjects, object => {
      return {
        ...extractLocaleSpecificValues(object, locale),
        category: extractLocaleSpecificValues(object.category, locale),
      };
    }),
);

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;

export const selectSearchInputForSearch = createSelector(
  selectSearchInputValue,
  inputValue => inputValue.trim(),
);

export const selectSearchHistory = createSelector(
  selectSearchHistoryObjectsIds,
  selectSearchHistoryObjects,
  (ids, objects) => {
    if (objects.length === 0) {
      return [];
    }
    const historyObjectsMap = reduce(
      objects,
      (acc, object) => {
        acc[object.id] = object;
        return acc;
      },
      {} as Record<string, SearchObject>,
    );
    return map(ids, id => {
      return historyObjectsMap[id];
    });
  },
);

export const selectSearchResultsWithLocation = createSelector(
  selectSearchObjectsData,
  searchResults => filter(searchResults, object => isLocationExist(object)),
);

export const selectSearchHistoryWithLocation = createSelector(
  selectSearchHistory,
  history => filter(history, isLocationExist),
);
