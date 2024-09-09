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
import {DEFAULT_DISTANCE_FILTER_VALUE} from 'core/constants';

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
    distance: {
      isOn: false,
      value: DEFAULT_DISTANCE_FILTER_VALUE,
      location: undefined,
    },
  },
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
      return {
        ...state,
        filtersData: payload,
      };
    });
});
