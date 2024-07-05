import {createReducer, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {
  changeRatingGoogle,
  getFiltersDataRequest,
  refreshFiltersDataRequest,
} from 'core/actions';
import type {RegionsList} from 'core/types/api';

interface FiltersState {
  regionsList: RegionsList;
  ratingGoogle: string[];
  activeRating: string;
}

const initialState: FiltersState = {
  regionsList: [],
  ratingGoogle: ['Any', '3,5+', '4+', '4,5+'],
  activeRating: 'Any',
};

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addMatcher(
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
    )
    .addMatcher(
      (action): action is PayloadAction<string> =>
        action.type === changeRatingGoogle.type,
      (state, {payload}) => {
        state.activeRating = payload;
      },
    );
});
