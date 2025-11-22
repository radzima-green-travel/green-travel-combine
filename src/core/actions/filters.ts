import {
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  CategoryFilterItemDTO,
  SearchFilters,
  SearchOptions,
} from 'core/types';
import { createAsyncAction } from 'core/helpers';
import { createAction } from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<
  { query?: string; filters: SearchFilters; options?: SearchOptions },
  {
    regionsList: RegionsListResponseDTO;
    categoriesList: CategoryFilterItemDTO[];
    filtersData: ObjectFiltersDataDTO;
  }
>('GET_FILTERS_DATA');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const initActiveFilters = createAction<SearchFilters>(
  'INIT_ACTIVE_FILTERS',
);

export const clearFilters = createAction('CLEAR_FILTERS');

export const fetchInitialFilters = createAsyncAction<
  void,
  {
    regionsList: RegionsListResponseDTO;
    categoriesList: CategoryFilterItemDTO[];
  }
>('FETCH_INITIAL_FILTERS');
