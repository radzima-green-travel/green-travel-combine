import {createReducer} from '@reduxjs/toolkit';
import {
  searchObjectsRequest,
  searchMoreObjectsRequest,
  setSearchInputValue,
  setSearchOptions,
  getMapSearchObjectsRequest,
  getVisibleOnMapObjectsRequest,
} from 'core/actions';
import {SearchOptions} from 'core/types';
import type {Highlight, ObjectMapDTO, SearchObjectDTO} from 'core/types/api';
import {mapValues} from 'lodash';
import {byIdReducer} from 'react-redux-help-kit';

interface SearchState {
  searchObjects: Array<SearchObjectDTO>;
  mapSearchObjects: ObjectMapDTO[];
  visibleOnMapObjects: Array<SearchObjectDTO>;
  nextToken: string | null;
  highlight: Highlight | null;
  inputValue: string;
  total: number;
  options: SearchOptions;
}

const initialState: SearchState = {
  searchObjects: [],
  mapSearchObjects: [],
  visibleOnMapObjects: [],
  highlight: null,
  inputValue: '',
  nextToken: null,
  total: 0,
  options: {byAddress: true, byDescription: true},
};
export const reducer = createReducer(initialState, builder => {
  builder.addCase(setSearchInputValue, (state, {payload}) => ({
    ...state,
    inputValue: payload,
  }));

  builder.addCase(
    searchObjectsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchObjects: payload.searchObjects,
      nextToken: payload.nextToken,
      total: payload.total,
      highlight: payload.highlight,
      visibleOnMapObjects: [],
    }),
  );

  builder.addCase(
    searchMoreObjectsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      searchObjects: [...state.searchObjects, ...payload.searchObjects],
      highlight: mapValues(state.highlight, (value, key) => {
        const newValues = payload.highlight?.[key] || [];
        return [...(value || []), ...newValues];
      }),
      nextToken: payload.nextToken,
      total: payload.total,
    }),
  );

  builder.addCase(setSearchOptions, (state, {payload}) => ({
    ...state,
    options: payload,
  }));

  builder.addCase(
    getMapSearchObjectsRequest.meta.successAction,
    (state, {payload}) => {
      return {
        ...state,
        mapSearchObjects: payload.mapSearchObjects,
      };
    },
  );
  builder.addCase(
    getVisibleOnMapObjectsRequest.meta.successAction,
    (state, {payload}) => {
      return {
        ...state,
        visibleOnMapObjects: payload,
      };
    },
  );
});

export const searchReducer = byIdReducer<SearchState>('search')(reducer);
