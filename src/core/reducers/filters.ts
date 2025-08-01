import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SearchFilters,
  CategoryFilterItemDTO,
  SetActiveFilterPayload,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  setActiveFilter,
  clearFilters,
  initActiveFilters,
  fetchInitialFilters,
} from 'core/actions';
import {xor} from 'lodash';
import {INITIAL_FILTERS} from 'core/constants';

interface FiltersState {
  initialFiltersData: ObjectFiltersDataDTO | null;
  regionsList: RegionsListResponseDTO;
  filtersData: ObjectFiltersDataDTO | null;
  activeFilters: SearchFilters;
  categoriesList: CategoryFilterItemDTO[];
}

const initialState: FiltersState = {
  initialFiltersData: null,
  regionsList: [],
  filtersData: null,
  activeFilters: INITIAL_FILTERS,
  categoriesList: [],
};

function getNewFilterState(
  payload: SetActiveFilterPayload,
  activeFilters: SearchFilters,
) {
  const dispancePayload = payload;
  const googlePayload = payload;

  if (googlePayload.name === 'googleRating') {
    return googlePayload.value;
  }

  if (dispancePayload.name === 'distance') {
    return {
      isOn: dispancePayload.isOn ?? activeFilters.distance?.isOn,
      value: dispancePayload.value || activeFilters.distance?.value,
      location: dispancePayload.location || activeFilters.distance?.location,
    };
  } else if (typeof payload.value === 'string') {
    return xor(activeFilters[payload.name], [payload.value]);
  }

  return payload.value;
}

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(setActiveFilter, (state, {payload}) => {
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [payload.name]: getNewFilterState(payload, state.activeFilters),
        },
      };
    })
    .addCase(clearFilters, state => {
      return {
        ...state,
        activeFilters: initialState.activeFilters,
        filtersData: state.initialFiltersData,
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
          initialFiltersData: state.initialFiltersData || filtersData,
        };
      },
    )
    .addCase(fetchInitialFilters.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        regionsList: payload.regionsList,
        categoriesList: payload.categoriesList,
      };
    })
    .addCase(initActiveFilters, (state, {payload}) => {
      return {
        ...state,
        activeFilters: payload,
      };
    });
});
