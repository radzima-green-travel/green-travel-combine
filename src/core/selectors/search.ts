import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';

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
  search => {
    return search.searchObjects;
  },
);

export const selectSearchObjectsHighlightRawData = createSelector(
  selectSearchState,
  search => search.highlight,
);

export const selectSearchObjectsTotal = createSelector(
  selectSearchState,
  search => search.total,
);

export const selectSearchInputValue = createSelector(
  selectSearchState,
  search => search.inputValue,
);

export const selectSearchQuery = createSelector(
  selectSearchInputValue,
  searchInput => (searchInput.length < 2 ? '' : searchInput),
);

export const selectSearchOptions = createSelector(
  selectSearchState,
  search => search.options,
);

export const selectSearchObjectsData = createSelector(
  selectSearchObjectsRawData,
  selectSearchObjectsHighlightRawData,
  selectSearchInputValue,
  selectAppLanguage,
  (searchObjects, highlight, query, locale) =>
    prepareSearchItems(searchObjects, highlight, query, locale),
);

export const selectSearchInputForSearch = createSelector(
  selectSearchInputValue,
  inputValue => inputValue.trim(),
);
