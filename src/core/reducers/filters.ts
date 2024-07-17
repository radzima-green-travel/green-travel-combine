import {createReducer, isAnyOf, createAction} from '@reduxjs/toolkit';
import {getFiltersDataRequest} from 'core/actions';
import {ACTIONS} from '../constants';

interface FiltersState {
  regionsList: {id: string; value: string}[];
  items: any;
  googleRatings: {key: string; value: string}[];
  activeRating: string | null;
  activeCategories: string[] | null;
  total: number;
}

const initialState: FiltersState = {
  regionsList: [],
  googleRatings: [],
  activeRating: null,
  activeCategories: null,
  total: 0,
  items: [],
};

export const changeRatingGoogle = createAction<string | null>(
  ACTIONS.CHANGE_FILTER_RATING_GOOGLE,
);

export const changeCategory = createAction<string>(
  ACTIONS.CHANGE_FILTER_CATEGORY,
);

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(changeRatingGoogle, (state, {payload}) => {
      state.activeRating = payload;
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
            value: key,
          })),
        };
      },
    );
});
