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
import {prepareAggregationsWithNumberOfItems} from 'core/transformators/filters';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  filtersData: ObjectFiltersDataDTO | null;
  activeFilters: ActiveFilters;
  categoriesList: CategoryFilterItemDTO[];
}

const initialState: FiltersState = {
  regionsList: [],
  filtersData: null,
  activeFilters: {
    googleRating: '',
    categories: [],
    regions: [],
    municipalities: [],
  },
  categoriesList: [],
};

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(setActiveFilter, (state, {payload}) => {
      let newState;
      if (payload.name === 'googleRating') {
        newState = payload.value;
      } else if (typeof payload.value === 'string') {
        newState = xor(state.activeFilters[payload.name], [payload.value]);
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
      getInitialFiltersRequest.meta.successAction,
      (state, {payload: {regionsList, categoriesList, filtersData}}) => {
        return {
          ...state,
          regionsList,
          categoriesList,
          filtersData,
        };
      },
    )
    .addCase(getFiltersDataRequest.meta.successAction, (state, {payload}) => {
      const {settlementsWithNumberOfItems} =
        prepareAggregationsWithNumberOfItems(payload.aggregations);

      const municipalities = state.activeFilters.municipalities;

      const updatedActiveFilters = {
        ...state.activeFilters,
        municipalities: municipalities.filter(
          item => settlementsWithNumberOfItems[item],
        ),
      } as ActiveFilters;

      return {
        ...state,
        filtersData: payload,
        activeFilters:
          JSON.stringify(updatedActiveFilters) ===
          JSON.stringify(state.activeFilters)
            ? state.activeFilters
            : updatedActiveFilters,
      };
    });
});
