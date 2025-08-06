import {createAsyncAction} from 'core/helpers';
import {Highlight, SearchObjectDTO} from 'core/types/api';
import {createAction} from '@reduxjs/toolkit';
import {SearchFilters, SearchOptions} from 'core/types';

interface SearchObjectsRequestPayload {
  query: string;
  filters?: SearchFilters;
  options: SearchOptions;
}

interface SearchObjectsResponsePayload {
  searchObjects: SearchObjectDTO[];
  nextToken: string | null;
  total: number;
  highlight: Highlight | null;
}

export const searchObjectsRequest = createAsyncAction<
  SearchObjectsRequestPayload,
  SearchObjectsResponsePayload
>('SEARCH_OBJECTS');

export const searchMoreObjectsRequest = createAsyncAction<
  SearchObjectsRequestPayload,
  SearchObjectsResponsePayload
>('SEARCH_MORE_OBJECTS');

export const setSearchInputValue = createAction<string>(
  'SET_SEARCH_INPUT_VALUE',
);

export const setSearchOptions =
  createAction<SearchOptions>('SET_SEARCH_OPTIONS');
