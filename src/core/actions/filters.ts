import {
  FiltersParams,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
  SetActiveFilterPayload,
  CategoryShortDTO,
  ObjectShortDTO,
} from 'core/types';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';

export const getFiltersDataRequest = createAsyncAction<
  FiltersParams,
  ObjectFiltersDataDTO
>('GET_FILTERS_DATA');

export const getInitialFilters = createAsyncAction<
  void,
  {
    filtersData: ObjectFiltersDataDTO;
    regionsList: RegionsListResponseDTO;
    categoriesData: {
      categoriesList: Array<CategoryShortDTO>;
      objectsByCategory: Record<string, ObjectShortDTO[]>;
    };
  }
>('GET_INITIAL_FILTERS');

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
