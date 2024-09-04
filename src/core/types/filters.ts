import {SpotItemDTO} from './api';

export type ActiveFilters = {
  googleRating: string;
  regions: string[];
  categories: string[];
  municipalities: string[];
  distance: {
    isOn: boolean;
    value: number;
    location?: {lat: number; lon: number};
  };
};

export type SetActiveFilterPayload =
  | {
      name: 'googleRating' | 'categories' | 'regions' | 'municipalities';
      value: string | string[];
    }
  | {
      name: 'distance';
      isOn: boolean;
      value: number;
      location?: {lat: number; lon: number};
    };

export type SettlementsData = {
  data: SpotItemDTO[];
  total: number;
};
