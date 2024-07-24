import {SearchParams} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

interface SuccessPayload {
  items: any;
  googleRatings: {key: string; from: string}[];
  total: number;
  categoriesBuckets: {key: string; doc_count: number}[];
  regionsBuckets: {key: string; doc_count: number}[];
}

export const getFiltersDataRequest = createAsyncAction<
  SearchParams,
  SuccessPayload
>('GET_FILTERS_DATA');

export const getFiltersDataRequestDuringFirstLoad = createAsyncAction<
  SearchParams,
  SuccessPayload & {regionsList: {id: string; value: string}[]}
>('GET_FILTERS_DATA_DURING_FIRST_LOAD');

export const changeRatingGoogle = createAction<string | null>(
  'CHANGE_FILTER_RATING_GOOGLE',
);

export const changeCategory = createAction<string>('CHANGE_FILTER_CATEGORY');

export const changeRegion = createAction<string>('CHANGE_FILTER_REGION');

export const clearFilters = createAction('CLEAR_FILTERS');
