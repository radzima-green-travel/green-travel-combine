import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareRegionsObject,
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
  prepareCategories,
} from 'core/transformators/filters';

export const selectFiltersData = (state: IState) => state.filters.fitersData;
export const selectRegions = (state: IState) => state.filters.regionsList;
export const selectActiveFilters = (state: IState) =>
  state.filters.activeFilters;
export const selectFiltersTotal = (state: IState) =>
  state.filters.fitersData?.total;
export const selectCategoriesList = (state: IState) =>
  state.filters.categoriesList;

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

export const selectFiltersCategories = createSelector(
  selectCategoriesList,
  selectAppLanguage,
  (categoriesList, locale) => {
    return prepareCategories(categoriesList, locale);
  },
);
