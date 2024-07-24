import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {getSpotTranslation} from 'core/helpers';

export const selectFilters = (state: IState) => state.filters;

export const selectTransformedFilters = createSelector(
  selectFilters,
  selectAppLanguage,
  (filters, locale) => ({
    ...filters,
    googleRatings: filters.googleRatings.map(({key, from}) => {
      return {
        key: from,
        label: key,
      };
    }),
    regionsList: filters.regionsList.map(item => {
      return {
        id: item.id,
        value: getSpotTranslation(item, locale ?? 'ru'),
      };
    }),
  }),
);
