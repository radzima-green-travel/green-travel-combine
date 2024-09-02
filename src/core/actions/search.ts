import {createAsyncAction} from 'core/helpers';
import {HighlightDTO, SearchObjectDTO} from 'core/types/api';
import {createAction} from '@reduxjs/toolkit';

export const searchObjectsRequest = createAsyncAction<
  {query: string},
  {
    searchObjects: SearchObjectDTO[];
    nextToken: string | null;
    total: number;
    highlight: Record<string, HighlightDTO[]>;
  }
>('SEARCH_OBJECTS');

export const searchMoreObjectsRequest = createAsyncAction<
  {query: string},
  {
    searchObjects: SearchObjectDTO[];
    nextToken: string | null;
    total: number;
    highlight: Record<string, HighlightDTO[]>;
  }
>('SEARCH_MORE_OBJECTS');

export const getSearchObjectsHistoryRequest = createAsyncAction<
  void,
  {
    searchHistoryObjects: SearchObjectDTO[];
  }
>('GET_SEARCH_OBJECTS_HISTORY');

export const addSearchObjectToHistory = createAction<{
  searchObject: SearchObjectDTO;
}>('ADD_SEARCH_OBJECT_TO_HISTORY');

export const setSearchInputValue = createAction<string>(
  'SET_SEARCH_INPUT_VALUE',
);
