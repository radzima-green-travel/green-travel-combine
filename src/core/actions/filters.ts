import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  CategoryFilterItemDTO,
  ActiveFilters,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  {
    filtersResult: ObjectFiltersDataDTO;
    activeFilters?: ActiveFilters;
  }
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
