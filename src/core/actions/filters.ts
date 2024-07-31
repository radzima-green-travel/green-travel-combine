import {
  CategoryFilterItemDTO,
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  ObjectFiltersDataDTO
>('GET_FILTERS_DATA');

export const getFiltersInitialDataRequest = createAsyncAction<
  void,
  {regionsList: RegionsListResponseDTO; categoriesList: CategoryFilterItemDTO[]}
>('GET_FILTERS_INITIAL_DATA_REQUEST');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
