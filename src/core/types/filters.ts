import {SpotItemDTO} from './api';
import {Location} from './user';

export type SearchFilters = {
  googleRating: string;
  regions: string[];
  categories: string[];
  municipalities: string[];
  distance: {
    isOn: boolean;
    value: number;
    location: Location | null;
  };
};

export type SetActiveFilterPayload =
  | {
      name: 'googleRating' | 'categories' | 'regions' | 'municipalities';
      value: string | string[];
    }
  | {
      name: 'distance';
      isOn?: boolean;
      value?: number;
      location?: Location;
    };

export type SettlementsData = {
  data: SpotItemDTO[];
  total: number;
};
