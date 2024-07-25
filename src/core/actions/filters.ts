import {SetActiveFilterPayload} from './../types/filters';
import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  ObjectFiltersDataDTO
>('GET_FILTERS_DATA');

export const getRegionsList = createAsyncAction<void, RegionsListResponseDTO>(
  'GET_REGIONS_LIST',
);

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
