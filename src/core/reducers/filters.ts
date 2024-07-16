import {createReducer, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {
  changeRatingGoogle,
  changeCategory,
  getFiltersDataRequest,
  refreshFiltersDataRequest,
} from 'core/actions';

interface FiltersState {
  regionsList: any;
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
          total: payload.total,
          items: payload.items,
          googleRatings: payload.googleRatings.map(({key, from}) => ({
            key: from,
            value: key,
          })),
        };
      },
    )
    .addMatcher(
      (action): action is PayloadAction<string> =>
        action.type === changeRatingGoogle.type,
      (state, {payload}) => {
        state.activeRating = payload;
      },
    )
    .addMatcher(
      (action): action is PayloadAction<string> =>
        action.type === changeCategory.type,
      (state, {payload}) => {
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
      },
    );
});
