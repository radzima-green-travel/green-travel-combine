import { createSelector } from 'reselect';
import { SearchObject } from '../types';
import { IState } from 'core/store';
import { map, reduce } from 'lodash';
import { selectAppLanguage } from './settingsSelectors';
import { selectSearchHistoryObjectsIds } from './user';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
} from '../transformators/common';

const selectSearchHistoryState = (state: IState) => state.searchHistory;

export const selectSearchHistoryRawObjects = createSelector(
  selectSearchHistoryState,
  search => search.searchHistoryObjects,
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
    return reduce(
      ids,
      (acc, id) => {
        const historyObject = historyObjectsMap[id];

        if (historyObject) {
          acc.push(historyObject);
        }
        return acc;
      },
      [] as SearchObject[],
    );
  },
);
