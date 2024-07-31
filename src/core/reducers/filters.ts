import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  ActiveFilters,
  CategoryFilterItemDTO,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  setActiveFilter,
  getInitialFiltersRequest,
  clearFilters,
} from 'core/actions';
import {xor} from 'lodash';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  fitersData: ObjectFiltersDataDTO | null;
  activeFilters: ActiveFilters;
  categoriesList: CategoryFilterItemDTO[];
}

const initialState: FiltersState = {
  regionsList: [],
  fitersData: null,
  activeFilters: {
    googleRating: '',
    categories: [],
    regions: [],
  },
  categoriesList: [],
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
    .addCase(
      getInitialFiltersRequest.meta.successAction,
      (state, {payload: {regionsList, categoriesList}}) => {
        return {
          ...state,
          regionsList,
          categoriesList,
        };
      },
    )
    .addCase(getFiltersDataRequest.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        fitersData: payload,
      };
    });
});
