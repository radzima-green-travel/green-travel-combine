import {SearchParams} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<SearchParams, any>(
  'GET_FILTERS_DATA',
);

export const refreshFiltersDataRequest = createAsyncAction<SearchParams, any>(
  'REFRESH_FILTERS_DATA',
);

export const changeRatingGoogle = createAction<string | null>(
  'filters/changeRatingGoogle',
);

export const changeCategory = createAction<string>('filters/changeCategory');
