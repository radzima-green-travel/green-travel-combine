import {SearchParams} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';

export const getFiltersDataRequest = createAsyncAction<
  SearchParams,
  {
    regionsList: {id: string; value: string}[];
    items: any;
    googleRatings: {key: string; from: string}[];
    total: number;
  }
>('GET_FILTERS_DATA');
