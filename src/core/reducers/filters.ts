import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  ActiveFilters,
  SettlementsData,
  CategoryFilterItemDTO,
} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  getSettlementsDataRequest,
  getFiltersDataRequest,
  setActiveFilter,
  getInitialFiltersRequest,
  clearFilters,
} from 'core/actions';
import {xor} from 'lodash';

interface FiltersState {
  regionsList: RegionsListResponseDTO;
  filtersData: ObjectFiltersDataDTO | null;
  activeFilters: ActiveFilters;
  settlementsData: SettlementsData;
  categoriesList: CategoryFilterItemDTO[];
}

const initialState: FiltersState = {
  regionsList: [],
  settlementsData: {
    data: [],
    requestedItemsCount: 0,
    nextToken: '',
    total: 0,
  },
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
      const newState =
        payload.name === 'googleRating'
          ? payload.value
          : typeof payload.value === 'string'
            ? xor(state.activeFilters[payload.name], [payload.value])
            : payload.value;

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
      (
        state,
        {payload: {regionsList, categoriesList, filtersData, settlementsData}},
      ) => {
        return {
          ...state,
          regionsList,
          categoriesList,
          filtersData,
          settlementsData,
        };
      },
    )
    .addCase(getFiltersDataRequest.meta.successAction, (state, {payload}) => {
      return {
        ...state,
        filtersData: payload,
      };
    })
    .addCase(
      getSettlementsDataRequest.meta.successAction,
      (state, {payload: {data, total, nextToken, requestedItemsCount}}) => ({
        ...state,
        settlementsData: {
          ...state.settlementsData,
          data: [...state.settlementsData.data, ...data],
          requestedItemsCount:
            state.settlementsData.requestedItemsCount + requestedItemsCount,
          nextToken,
          total,
        },
      }),
    );
});
