import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  ActiveFilters,
  CategoryShortDTO,
  ObjectShortDTO,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  setActiveFilter,
  getInitialFilters,
  clearFilters,
} from 'core/actions';
import {xor} from 'lodash';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  fitersData: ObjectFiltersDataDTO | null;
  activeFilters: ActiveFilters;
  categoriesData: {
    categoriesList: Array<CategoryShortDTO>;
    objectsByCategory: Record<string, ObjectShortDTO[]>;
  };
}

const initialState: FiltersState = {
  regionsList: [],
  fitersData: null,
  activeFilters: {
    googleRating: '',
    categories: [],
    regions: [],
  },
  categoriesData: {
    categoriesList: [],
    objectsByCategory: {},
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
    .addCase(getInitialFilters.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(getFiltersDataRequest.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        fitersData: payload,
      };
    });
});
