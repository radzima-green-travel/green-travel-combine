import {createAsyncAction} from 'core/helpers';
import {Highlight, SearchObjectDTO} from 'core/types/api';
import {createAction} from '@reduxjs/toolkit';
import {SearchFilters, SearchOptions} from 'core/types';

export const searchObjectsRequest = createAsyncAction<
  {query: string; filters?: SearchFilters},
  {
    searchObjects: SearchObjectDTO[];
    nextToken: string | null;
    total: number;
    highlight: Highlight;
  }
>('SEARCH_OBJECTS');

export const searchMoreObjectsRequest = createAsyncAction<
  {query: string; filters?: SearchFilters},
  {
    searchObjects: SearchObjectDTO[];
    nextToken: string | null;
    total: number;
    highlight: Highlight;
  }
>('SEARCH_MORE_OBJECTS');

export const setSearchInputValue = createAction<string>(
  'SET_SEARCH_INPUT_VALUE',
);

export const setSearchOptions =
  createAction<SearchOptions>('SET_SEARCH_OPTIONS');
