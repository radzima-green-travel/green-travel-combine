import {createSelector} from 'reselect';
import {SearchObject} from '../types';
import {IState} from 'core/store';
import {map, reduce} from 'lodash';
import {selectAppLanguage} from './settingsSelectors';
import {selectSearchHistoryObjectsIds} from './user';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
} from '../transformators/common';
import {prepareSearchItems} from '../transformators/search';

const selectSearchState = createSelector(
  (state: IState) => state.search,
  (_: IState, reducerId: string) => reducerId,
  (searchState, reducerId) => searchState[reducerId],
);

export const selectSearchNextToken = createSelector(
  selectSearchState,
  search => search.nextToken,
);

export const selectSearchObjectsRawData = createSelector(
  selectSearchState,
  search => search.searchObjects,
);

export const selectSearchObjectsHighlightRawData = createSelector(
  selectSearchState,
  search => search.highlight,
);

export const selectSearchObjectsTotal = createSelector(
  selectSearchState,
  search => search.total,
);

export const selectSearchHistoryRawObjects = createSelector(
  selectSearchState,
  search => search.searchHistoryObjects,
);

export const selectSearchInputValue = createSelector(
  selectSearchState,
  search => search.inputValue,
);

export const selectSearchObjectsData = createSelector(
  selectSearchObjectsRawData,
  selectSearchObjectsHighlightRawData,
  selectAppLanguage,
  (searchObjects, highlight, locale) =>
    prepareSearchItems(searchObjects, highlight, locale),
);

export const selectSearchHistoryObjects = createSelector(
  selectSearchHistoryRawObjects,
  selectAppLanguage,
  (searchObjects, locale) =>
    map(searchObjects, object => {
      return {
        ...translateAndProcessImagesForEntity(object, locale),
        category: extractLocaleSpecificValues(object.category, locale),
      };
    }),
);

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
