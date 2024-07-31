import {SpotItemDTO} from './api';

export type ActiveFilters = {
  googleRating: string;
  regions: string[];
  categories: string[];
  municipalities: string[];
};

export type SetActiveFilterPayload = {
  name: 'googleRating' | 'categories' | 'regions' | 'municipalities';
  value: string | string[];
};

export type SettlementsData = {
  data: SpotItemDTO[];
  requestedItemsCount: number;
  nextToken: string;
  total: number;
};
