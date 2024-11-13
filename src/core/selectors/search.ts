import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';

import {
  prepareSearchFiltersBarItems,
  prepareSearchItems,
} from '../transformators/search';
import {SearchFilters} from 'core/types';
import {selectUserAuthorized} from './authentificationSelectors';
import {selectFiltersCategories, selectFiltersRegions} from './filtersPage';
import {selectSettlements} from './settlements';
import {checkIfFiltersAreUnset} from 'core/transformators/filters';

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

export const selectSearchFiltersItems = createSelector(
  (_: IState, appliedFilters?: SearchFilters) => appliedFilters,
  selectUserAuthorized,
  selectFiltersRegions,
  selectFiltersCategories,
  selectSettlements,
  (filters, isAuthorized, regions, categories, settlements) => {
    if (!filters || checkIfFiltersAreUnset(filters)) {
      return [];
    }

    return prepareSearchFiltersBarItems({
      filters,
      isAuthorized,
      regions,
      categories,
      settlements,
    });
  },
);
