import { createSelector } from '@reduxjs/toolkit';
import { IState } from 'core/store';
import { selectAppLanguage } from './settingsSelectors';
import {
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
  checkIfFiltersAreUnset,
} from 'core/transformators/filters';
import { extractLocaleSpecificValues } from 'core/transformators/common';
import { map } from 'lodash';
import { selectUserLocation } from './user';
import { INITIAL_FILTERS } from '../constants';
import { SearchFilters } from '../types';

export const selectFiltersSlice = (state: IState) => state.filters;

export const selectFiltersData = createSelector(
  selectFiltersSlice,
  filters => filters.filtersData,
);
export const selectRegions = createSelector(
  selectFiltersSlice,
  filters => filters.regionsList,
);

const selectActiveFiltersBase = createSelector(
  selectFiltersSlice,
  filters => filters.activeFilters,
);
export const selectActiveFilters = createSelector(
  selectActiveFiltersBase,
  filters =>
    ({
      ...INITIAL_FILTERS,
      ...filters,
      distance: {
        ...INITIAL_FILTERS.distance,
        ...filters.distance,
      },
    }) as Required<SearchFilters>,
);

export const selectFiltersTotal = createSelector(
  selectFiltersSlice,
  filters => filters.filtersData?.total,
);
export const selectFiltersCategoriesList = createSelector(
  selectFiltersSlice,
  filters => filters.categoriesList,
);

export const selectFiltersRegions = createSelector(
  selectRegions,
  selectAppLanguage,
  (regions, locale) => {
    return map(regions, region => extractLocaleSpecificValues(region, locale));
  },
);

export const selectFiltersCategories = createSelector(
  selectFiltersCategoriesList,
  selectAppLanguage,
  (categories, locale) => {
    return map(categories, category =>
      extractLocaleSpecificValues(category, locale),
    );
  },
);

export const selectTransformedGoogleRatings = createSelector(
  selectFiltersData,
  filtersData => {
    return prepareGoogleRatings(
      filtersData?.aggregations?.googleRatings?.facets?.buckets || [],
    );
  },
);

export const selectTransformedAggregationsWithNumberOfItems = createSelector(
  selectFiltersData,
  filtersData => {
    return prepareAggregationsWithNumberOfItems(filtersData?.aggregations);
  },
);

export const selectAreAllActiveFiltersUnset = createSelector(
  selectActiveFilters,
  checkIfFiltersAreUnset,
);

export const selectDistanceFilterLocation = selectUserLocation;

export const selectIsFiltersInitialDataLoaded = createSelector(
  selectFiltersCategoriesList,
  selectRegions,
  (categories, regions) => {
    return Boolean(categories.length && regions.length);
  },
);
