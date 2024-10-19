import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareGoogleRatings,
  prepareAggregationsWithNumberOfItems,
  checkIfFiltersAreUnset,
} from 'core/transformators/filters';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';
import {selectUserLocation} from './user';

export const selectFiltersData = (state: IState) => state.filters.filtersData;
export const selectRegions = (state: IState) => state.filters.regionsList;
export const selectActiveFilters = (state: IState) =>
  state.filters.activeFilters;
export const selectActiveFiltersLocation = (state: IState) =>
  state.filters.activeFilters.distance.location;
export const selectFiltersTotal = (state: IState) =>
  state.filters.filtersData?.total;
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
