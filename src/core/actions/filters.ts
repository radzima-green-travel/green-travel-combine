import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  SettlementsData,
  CategoryFilterItemDTO,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getSettlementsDataRequest = createAsyncAction<
  void,
  SettlementsData
>('GET_SETTLEMENTS_DATA');

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
    settlementsData: SettlementsData;
  }
>('GET_INITIAL_FILTERS');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
