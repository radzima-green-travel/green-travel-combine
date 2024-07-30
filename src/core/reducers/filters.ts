import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  ActiveFilters,
  CategoryShortDTO,
  SettlementsData,
  ObjectShortDTO,
} from 'core/types';
import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getSettlementsDataRequest,
  getSettlementsInitialDataRequest,
  getFiltersDataRequest,
  getFiltersCategories,
  getRegionsList,
  setActiveFilter,
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
  settlementsData: SettlementsData;
}

const initialState: FiltersState = {
  regionsList: [],
  settlementsData: {
    data: [],
    requestedItemsCount: 0,
    nextToken: '',
    total: 0,
  },
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
    .addCase(getFiltersCategories.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        categoriesData: payload,
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
    })
    .addMatcher(
      isAnyOf(
        getSettlementsDataRequest.meta.successAction,
        getSettlementsInitialDataRequest.meta.successAction,
      ),
      (state, {payload}) => ({
        ...state,
        settlementsData: payload,
      }),
    );
});
