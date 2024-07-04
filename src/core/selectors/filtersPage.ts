import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectAppLanguage} from './settingsSelectors';

export const selectFiltersRegions = (state: IState) =>
  state.filters.regionsList;

export const selectFiltersRegionsList = createSelector(
  selectFiltersRegions,
  selectAppLanguage,
  regionsList => {
    return regionsList;
  },
);

export const selectFilterData = createSelector(
  selectFiltersRegionsList,
  regionsList => {
    return regionsList;
  },
);
