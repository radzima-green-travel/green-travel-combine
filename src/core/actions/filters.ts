import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  CategoryShortDTO,
  ObjectShortDTO,
  SettlementsData,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getSettlementsDataRequest = createAsyncAction<
  string,
  SettlementsData
>('GET_SETTLEMENTS_DATA');

export const getSettlementsInitialDataRequest = createAsyncAction<
  string,
  SettlementsData
>('GET_SETTLEMENTS_INITIAL_DATA');

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  ObjectFiltersDataDTO
>('GET_FILTERS_DATA');

export const getRegionsList = createAsyncAction<void, RegionsListResponseDTO>(
  'GET_REGIONS_LIST',
);

export const getFiltersCategories = createAsyncAction<
  void,
  {
    categoriesList: Array<CategoryShortDTO>;
    objectsByCategory: Record<string, ObjectShortDTO[]>;
  }
>('GET_FILTERS_CATEGORIES');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
