import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {getSpotTranslation, reduceCount} from 'core/helpers';

export const selectFilters = (state: IState) => state.filters;

export const selectTransformedFilters = createSelector(
  selectFilters,
  selectAppLanguage,
  (filters, locale) => ({
    ...filters,
    total: filters.fitersData.total,
    items: filters.fitersData.items,
    countOfItemsForCategories: reduceCount(
      filters.fitersData.aggregations.categories.facets.buckets,
    ),
    countOfItemsForRegions: reduceCount(
      filters.fitersData.aggregations.regions.facets.buckets,
    ),
    googleRatings:
      filters.fitersData.aggregations.googleRatings.facets.buckets.map(
        ({key, from}) => {
          return {
            key: from,
            label: key,
          };
        },
      ),
    regionsList: filters.regionsList.map(item => {
      return {
        id: item.id,
        value: getSpotTranslation(item, locale ?? 'en'),
      };
    }),
  }),
);
