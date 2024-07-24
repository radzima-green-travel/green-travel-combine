import {SearchParams} from './../types/api/graphql';
import {createAsyncAction} from 'core/helpers';
import {createAction} from '@reduxjs/toolkit';
import {SpotI18n} from 'core/types';

export interface FiltersSuccessPayload {
  total: number;
  items: any;
  googleRatings: {key: string; from: string}[];
  aggregations: {
    categories: {
      facets: {
        buckets: {
          key: string;
          doc_count: number;
        }[];
      };
    };
    regions: {
      facets: {
        buckets: {
          key: string;
          doc_count: number;
        }[];
      };
    };
    googleRatings: {
      facets: {
        buckets: {
          key: string;
          from: number;
        }[];
      };
    };
  };
}

export type SetActiveFilterPayload =
  | {
      name: 'googleRating';
      value: string | null;
    }
  | {
      name: 'regions';
      value: string;
    }
  | {
      name: 'categories';
      value: string;
    };

export type RegionsSuccessPayload = {
  id: string;
  value: string;
  i18n: SpotI18n;
}[];

export const getFiltersDataRequest = createAsyncAction<
  SearchParams,
  FiltersSuccessPayload
>('GET_FILTERS_DATA');

export const getRegionsList = createAsyncAction<void, RegionsSuccessPayload>(
  'GET_REGIONS_LIST',
);

export const setActiveFilter =
  createAction<SetActiveFilterPayload>('SET_ACTIVE_FILTER');

export const clearFilters = createAction('CLEAR_FILTERS');
