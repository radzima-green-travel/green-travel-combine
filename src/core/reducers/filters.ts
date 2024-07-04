import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {getFiltersDataRequest, refreshFiltersDataRequest} from 'core/actions';
import type {RegionsList} from 'core/types/api';

interface FiltersState {
  regionsList: RegionsList;
}

const initialState: FiltersState = {
  regionsList: [],
};

export const filtersReducer = createReducer(initialState, builder => {
  builder.addMatcher(
    isAnyOf(
      getFiltersDataRequest.meta.successAction,
      refreshFiltersDataRequest.meta.successAction,
    ),
    (state, {payload}) => {
      return {
        ...state,
        regionsList: payload.regionsList,
      };
    },
  );
});
