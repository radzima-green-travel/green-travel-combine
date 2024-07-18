import {createReducer, isAnyOf, createAction} from '@reduxjs/toolkit';
import {getFiltersDataRequest} from 'core/actions';
import {ACTIONS} from '../constants';

interface FiltersState {
  regionsList: {id: string; value: string}[];
  items: any;
  googleRatings: {key: string; label: string}[];
  activeRating: string | null;
  activeCategories: string[] | null;
  activeRegions: string[] | null;
  total: number;
}

const initialState: FiltersState = {
  regionsList: [],
  googleRatings: [],
  activeRating: null,
  activeCategories: null,
  activeRegions: null,
  total: 0,
  items: [],
};

export const changeRatingGoogle = createAction<string | null>(
  ACTIONS.CHANGE_FILTER_RATING_GOOGLE,
);

export const changeCategory = createAction<string>(
  ACTIONS.CHANGE_FILTER_CATEGORY,
);

export const changeRegion = createAction<string>(ACTIONS.CHANGE_FILTER_REGION);

export const clearFilters = createAction(ACTIONS.CLEAR_FILTERS);

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(changeRatingGoogle, (state, {payload}) => {
      state.activeRating = payload;
    })
    .addCase(clearFilters, () => {
      return initialState;
    })
    .addCase(changeRegion, (state, {payload}) => {
      const activeRegions = state.activeRegions || [];

      if (activeRegions.includes(payload)) {
        if (activeRegions.length === 1) {
          state.activeRegions = null;
          return;
        }
        state.activeRegions = activeRegions.filter(item => item !== payload);
        return;
      }

      state.activeRegions = [...activeRegions, payload];
    })
    .addCase(changeCategory, (state, {payload}) => {
      const activeCategories = state.activeCategories || [];

      if (activeCategories.includes(payload)) {
        if (activeCategories.length === 1) {
          state.activeCategories = null;
          return;
        }
        state.activeCategories = activeCategories.filter(
          item => item !== payload,
        );
        return;
      }

      state.activeCategories = [...activeCategories, payload];
    })
    .addMatcher(
      isAnyOf(getFiltersDataRequest.meta.successAction),
      (state, {payload}) => {
        return {
          ...state,
          regionsList: payload.regionsList,
          total: payload.total,
          items: payload.items,
          googleRatings: payload.googleRatings.map(({key, from}) => ({
            key: from,
            label: key,
          })),
        };
      },
    );
});
