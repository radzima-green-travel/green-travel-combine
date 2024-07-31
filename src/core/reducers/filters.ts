import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  ActiveFilters,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  getRegionsList,
  setActiveFilter,
  clearFilters,
} from 'core/actions';
import {xor} from 'lodash';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  fitersData: ObjectFiltersDataDTO | null;
  activeFilters: ActiveFilters;
}

const initialState: FiltersState = {
  regionsList: [],
  fitersData: null,
  activeFilters: {
    googleRating: '',
    categories: [],
    regions: [],
  },
};

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(setActiveFilter, (state, {payload}) => {
      const newState =
        payload.name === 'googleRating'
          ? payload.value
          : xor(state.activeFilters[payload.name], [payload.value]);

      state.activeFilters = {
        ...state.activeFilters,
        [payload.name]: newState,
      };
    })
    .addCase(clearFilters, state => {
      return {
        ...state,
        activeFilters: initialState.activeFilters,
      };
    })
    .addCase(getRegionsList.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        regionsList: payload,
      };
    })
    .addCase(getFiltersDataRequest.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        fitersData: payload,
      };
    });
});
