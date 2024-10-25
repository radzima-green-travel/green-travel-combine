import {createReducer} from '@reduxjs/toolkit';
import {
  getSearchObjectsHistoryRequest,
  addSearchObjectToHistory,
} from 'core/actions';
import type {SearchObjectDTO} from 'core/types/api';

interface SearchState {
  searchHistoryObjects: Array<SearchObjectDTO>;
}

const initialState: SearchState = {
  searchHistoryObjects: [],
};
export const searchHistoryReducer = createReducer(initialState, builder => {
  builder.addCase(
    getSearchObjectsHistoryRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchHistoryObjects: payload.searchHistoryObjects,
    }),
  );

  builder.addCase(
    addSearchObjectToHistory,
    (state, {payload: {searchObject}}) => ({
      ...state,
      searchHistoryObjects: [...state.searchHistoryObjects, searchObject],
    }),
  );
});
