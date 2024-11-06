import {createAsyncAction} from 'core/helpers';
import {SearchObjectDTO} from 'core/types/api';
import {createAction} from '@reduxjs/toolkit';

export const getSearchObjectsHistoryRequest = createAsyncAction<
  void,
  {
    searchHistoryObjects: SearchObjectDTO[];
  }
>('GET_SEARCH_OBJECTS_HISTORY');

export const addSearchObjectToHistory = createAction<{
  searchObject: SearchObjectDTO;
}>('ADD_SEARCH_OBJECT_TO_HISTORY');
