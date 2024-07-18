import {createReducer, isAnyOf, createAction} from '@reduxjs/toolkit';
import {
  getFiltersDataRequest,
  getFiltersDataRequestDuringFirstLoad,
} from 'core/actions';
import {ACTIONS} from '../constants';

interface FiltersState {
  regionsList: {id: string; value: string}[];
  items: any;
  googleRatings: {key: string; label: string}[];
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

export const changeRatingGoogle = createAction<string | null>(
  ACTIONS.CHANGE_FILTER_RATING_GOOGLE,
);

export const changeCategory = createAction<string>(
  ACTIONS.CHANGE_FILTER_CATEGORY,
);

export const changeRegion = createAction<string>(ACTIONS.CHANGE_FILTER_REGION);

export const clearFilters = createAction(ACTIONS.CLEAR_FILTERS);

const updateActiveList = (
  list: string[] | null,
  item: string,
): string[] | null => {
  if (!list) {
    return [item];
  }
  const updatedList = list.includes(item)
    ? list.filter(existingItem => existingItem !== item)
    : [...list, item];
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
      isAnyOf(
        getFiltersDataRequest.meta.successAction,
        getFiltersDataRequestDuringFirstLoad.meta.successAction,
      ),
      (state, {payload}) => {
        return {
          ...state,
          regionsList:
            'regionsList' in payload ? payload.regionsList : state.regionsList,
          total: payload.total,
          items: payload.items,
          googleRatings: payload.googleRatings.map(({key, from}) => ({
            key: from,
            label: key,
          })),
          countOfItemsForCategories: reduceCount(payload.categoriesBuckets),
          countOfItemsForRegions: reduceCount(payload.regionsBuckets),
        };
      },
    );
});
