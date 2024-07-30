import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareRegionsObject,
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
  prepareCategories,
} from 'core/transformators/filters';

export const selectFilters = (state: IState) => state.filters;
export const selectFiltersData = (state: IState) => state.filters.fitersData;
export const selectRegions = (state: IState) => state.filters.regionsList;
export const selectActiveFilters = (state: IState) =>
  state.filters.activeFilters;
export const selectFiltersTotal = (state: IState) =>
  state.filters.fitersData?.total;
export const selectFiltersCategoriesData = (state: IState) =>
  state.filters.categoriesData;

export const selectTransformedRegions = createSelector(
  selectRegions,
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

export const selectTransformedFiltersCategories = createSelector(
  selectFiltersCategoriesData,
  selectAppLanguage,
  ({categoriesList, objectsByCategory}, locale) => {
    return prepareCategories(categoriesList, objectsByCategory, locale);
  },
);
