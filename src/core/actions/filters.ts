import {SearchParams} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';

export const getFiltersDataRequest = createAsyncAction<SearchParams, {}>(
  'GET_FILTERS_DATA',
);
