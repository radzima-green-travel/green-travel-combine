import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SearchFilters,
  CategoryFilterItemDTO,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  setActiveFilter,
  clearFilters,
  initActiveFilters,
} from 'core/actions';
import {xor} from 'lodash';
import {INITIAL_FILTERS} from 'core/constants';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  filtersData: ObjectFiltersDataDTO | null;
  activeFilters: SearchFilters;
  categoriesList: CategoryFilterItemDTO[];
}

const initialState: FiltersState = {
  regionsList: [],
  filtersData: null,
  activeFilters: INITIAL_FILTERS,
  categoriesList: [],
};

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(setActiveFilter, (state, {payload}) => {
      let newState;
      if (payload.name === 'googleRating') {
        newState = payload.value;
      } else if (
        typeof payload.value === 'string' &&
        payload.name !== 'distance'
      ) {
        newState = xor(state.activeFilters[payload.name], [payload.value]);
      } else if (payload.name === 'distance') {
        newState = {
          isOn: payload.isOn ?? state.activeFilters.distance.isOn,
          value: payload.value || state.activeFilters.distance.value,
          location: payload.location || state.activeFilters.distance.location,
        };
      } else {
        newState = payload.value;
      }
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

    .addCase(
      getFiltersDataRequest.meta.successAction,
      (state, {payload: {regionsList, categoriesList, filtersData}}) => {
        return {
          ...state,
          regionsList,
          categoriesList,
          filtersData,
        };
      },
    )
    .addCase(initActiveFilters, (state, {payload}) => {
      return {
        ...state,
        activeFilters: payload,
      };
    });
});
