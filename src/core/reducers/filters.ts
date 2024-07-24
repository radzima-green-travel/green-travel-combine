import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  getRegionsList,
  changeCategory,
  changeRatingGoogle,
  changeRegion,
  clearFilters,
} from 'core/actions';
import {xor} from 'lodash';

interface FiltersState {
  regionsList: {id: string; value: string}[];
  items: any;
  googleRatings: {key: string; from: string}[];
  activeRating: string | null;
  activeCategories: string[] | null;
  activeRegions: string[] | null;
  total: number;
  countOfItemsForCategories: {[key: string]: number};
  countOfItemsForRegions: {[key: string]: number};
}

const initialState: FiltersState = {
  regionsList: [],
  googleRatings: [],
  activeRating: null,
  activeCategories: null,
  activeRegions: null,
  total: 0,
  items: [],
  countOfItemsForCategories: {},
  countOfItemsForRegions: {},
};

const updateActiveList = (
  list: string[] | null,
  item: string,
): string[] | null => {
  if (!list) {
    return [item];
  }
  const updatedList = xor(list, [item]);
  return updatedList.length ? updatedList : null;
};

const reduceCount = (
  buckets: {key: string; doc_count: number}[],
): {[key: string]: number} =>
  buckets.reduce((acc, {key, doc_count}) => {
    acc[key] = doc_count;
    return acc;
  }, {});

export const filtersReducer = createReducer(initialState, builder => {
  builder
    .addCase(changeRatingGoogle, (state, {payload}) => {
      state.activeRating = payload;
    })
    .addCase(clearFilters, state => {
      return {
        ...initialState,
        regionsList: state.regionsList,
        googleRatings: state.googleRatings,
      };
    })
    .addCase(changeRegion, (state, {payload}) => {
      state.activeRegions = updateActiveList(state.activeRegions, payload);
    })
    .addCase(changeCategory, (state, {payload}) => {
      state.activeCategories = updateActiveList(
        state.activeCategories,
        payload,
      );
    })
    .addMatcher(
      isAnyOf(getRegionsList.meta.successAction),
      (state, {payload}) => {
        return {
          ...state,
          regionsList: payload.regionsList,
        };
      },
    )
    .addMatcher(
      isAnyOf(getFiltersDataRequest.meta.successAction),
      (state, {payload}) => {
        return {
          ...state,
          total: payload.total,
          items: payload.items,
          googleRatings: payload.googleRatings,
          countOfItemsForCategories: reduceCount(payload.categoriesBuckets),
          countOfItemsForRegions: reduceCount(payload.regionsBuckets),
        };
      },
    );
});
