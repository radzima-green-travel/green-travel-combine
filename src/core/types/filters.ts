import { SpotItemDTO } from './api';
import { Location } from './user';

export type SearchFilters = Partial<{
  googleRating: string;
  regions: string[];
  categories: string[];
  municipalities: string[];
  distance: {
    isOn: boolean;
    value: number;
    location: Location | null;
  };
  excludeVisited: boolean;
  markedAsNotOnGoogleMaps: boolean;
  objectIds: string[];
}>;

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
    }
  | {
      name: 'excludeVisited';
      value: boolean;
    };

export type SettlementsData = SpotItemDTO[];
