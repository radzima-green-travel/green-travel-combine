import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareRegionsObject,
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
} from 'core/transformators/filters';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';

export const selectFiltersData = (state: IState) => state.filters.fitersData;
export const selectRegionsRawData = (state: IState) =>
  state.filters.regionsList;
export const selectCategoriesRawData = (state: IState) =>
  state.filters.categoriesList;
export const selectActiveFilters = (state: IState) =>
  state.filters.activeFilters;
export const selectFiltersTotal = (state: IState) =>
  state.filters.fitersData?.total;

export const selectFiltersCategories = createSelector(
  selectCategoriesRawData,
  selectAppLanguage,
  (categories, locale) => {
    return map(categories, category =>
      extractLocaleSpecificValues(category, locale),
    );
  },
);

export const selectTransformedRegions = createSelector(
  selectRegionsRawData,
  selectAppLanguage,
  (regions, locale) => {
    return prepareRegionsObject(regions, locale);
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
