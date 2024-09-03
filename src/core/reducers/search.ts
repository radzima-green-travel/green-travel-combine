import {createReducer} from '@reduxjs/toolkit';
import {
  searchObjectsRequest,
  searchMoreObjectsRequest,
  setSearchInputValue,
  getSearchObjectsHistoryRequest,
  addSearchObjectToHistory,
} from 'core/actions';
import type {HighlightDTO, SearchObjectDTO} from 'core/types/api';
import {mapValues} from 'lodash';
import {byIdReducer} from 'react-redux-help-kit';

interface SearchState {
  searchObjects: Array<SearchObjectDTO>;
  nextToken: string | null;
  searchHistoryObjects: Array<SearchObjectDTO>;
  highlight: Record<string, HighlightDTO[]> | null;
  inputValue: string;
  total: number;
}

const initialState: SearchState = {
  searchObjects: [],
  searchHistoryObjects: [],
  highlight: null,
  inputValue: '',
  nextToken: null,
  total: 0,
};
export const reducer = createReducer(initialState, builder => {
  builder.addCase(
    getSearchObjectsHistoryRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchHistoryObjects: payload.searchHistoryObjects,
    }),
  );

  builder.addCase(setSearchInputValue, (state, {payload}) => ({
    ...state,
    inputValue: payload,
  }));
  builder.addCase(
    addSearchObjectToHistory,
    (state, {payload: {searchObject}}) => ({
      ...state,
      searchHistoryObjects: [...state.searchHistoryObjects, searchObject],
    }),
  );

  builder.addCase(
    searchObjectsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchObjects: payload.searchObjects,
      nextToken: payload.nextToken,
      total: payload.total,
      highlight: payload.highlight,
    }),
  );

  builder.addCase(
    searchMoreObjectsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchObjects: [...state.searchObjects, ...payload.searchObjects],
      highlight: mapValues(state.highlight, (value, key) => {
        const newValues = payload.highlight[key] || [];
        return [...value, ...newValues];
      }),
      nextToken: payload.nextToken,
      total: payload.total,
    }),
  );
});

export const searchReducer = byIdReducer<SearchState>('search')(reducer);
