import {SpotItemDTO} from './api';

export type ActiveFilters = {
  googleRating: string;
  regions: string[];
  categories: string[];
};

export type SetActiveFilterPayload = {
  name: 'googleRating' | 'categories' | 'regions';
  value: string;
};

export type SettlementsData = {
  data: SpotItemDTO[];
  requestedItemsCount: number;
  nextToken: string;
  total: number;
};
