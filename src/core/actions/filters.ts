import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  SettlementsData,
  CategoryFilterItemDTO,
  SettlementsParams,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getSettlementsDataRequest = createAsyncAction<
  SettlementsParams | void,
  SettlementsData
>('GET_SETTLEMENTS_DATA');

export const getSearchSettlementsDataRequest = createAsyncAction<
  SettlementsParams | void,
  SettlementsData
>('GET_SEARCH_SETTLEMENTS_DATA');

export const getPaginationSettlementsDataRequest = createAsyncAction<
  SettlementsParams | void,
  SettlementsData
>('GET_PAGINATION_SETTLEMENTS_DATA');

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  ObjectFiltersDataDTO
>('GET_FILTERS_DATA');

export const getInitialFiltersRequest = createAsyncAction<
  void,
  {
    regionsList: RegionsListResponseDTO;
    categoriesList: CategoryFilterItemDTO[];
    filtersData: ObjectFiltersDataDTO;
  }
>('GET_INITIAL_FILTERS');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
