import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectAppLanguage} from './settingsSelectors';

export const selectFilters = (state: IState) => state.filters;

export const selectFiltersState = createSelector(
  selectFilters,
  selectAppLanguage,
  filtersState => {
    return filtersState;
  },
);
