import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
} from 'core/transformators/filters';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';

export const selectFiltersData = (state: IState) => state.filters.fitersData;
export const selectRegions = (state: IState) => state.filters.regionsList;
export const selectActiveFilters = (state: IState) =>
  state.filters.activeFilters;
export const selectFiltersTotal = (state: IState) =>
  state.filters.fitersData?.total;
export const selectFiltersCategoriesList = (state: IState) =>
  state.filters.categoriesList;

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
