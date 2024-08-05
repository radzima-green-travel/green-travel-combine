import {MultiPolygon, LineString} from '@turf/helpers';
import {
  AccommodationPlaceItem,
  BelongsToItem,
  DinnerPlacesItem,
  IncludeItem,
  UpcomingEventsItem,
  ChildServicesItem,
  RentingItem,
} from 'api/graphql/types';
import {ObjectField} from 'core/constants';

interface DefaultI18n {
  locale: string;
}
export type I18nType<T extends string> = {
  [key in T]: string | null;
} & DefaultI18n;

export type ExtractI18nKeys<T> = {
  [K in keyof T]: T[K] extends Array<I18nType<infer R>> ? R : never;
}[keyof T];

export interface CategoryShortDTO {
  cover: string;
  i18n: Array<I18nType<'name'>>;
  name: string;
  id: string;
  parent: string | null;
  blurhash: string | null;
  index: number;
  owner: string | null;
}

export interface ObjectShortDTO {
  cover: string;
  category: {
    name: string;
  };
  i18n: Array<I18nType<'name'>>;
  name: string;
  id: string;
  blurhash: string | null;
  categoryId: string;
}

export interface LocationDTO {
  lat: number;
  lon: number;
}

export interface ObjectCategoryMapDTO {
  id: string;
  icon: string;
  name: string;
  singularName: string;
  i18n: Array<I18nType<'name' | 'singularName'>>;
}

export interface AddressItemDTO {
  region: {
    value: string;
    i18n: Array<I18nType<'value'>>;
  };
  municipality: {
    value: string;
    i18n: Array<I18nType<'value'>>;
  };
  subRegion: {
    value: string;
    i18n: Array<I18nType<'value'>>;
  };
  street: string;
}

export interface AddressessDTO {
  items: Array<AddressItemDTO>;
}

export interface ObjectMapDTO {
  location: LocationDTO | null;
  name: string;
  id: string;
  i18n: Array<I18nType<'name'>>;
  category: ObjectCategoryMapDTO;
  addresses: AddressessDTO;
  length: number | null;
}

export interface SearchObjetcCategoryDTO {
  name: string;
  icon: string;
  i18n: Array<I18nType<'name'>>;
}

export interface SearchObjectDTO {
  name: string;
  id: string;
  i18n: Array<I18nType<'name'>>;
  category: SearchObjetcCategoryDTO;
  location: LocationDTO | null;
}

export interface CategoryAggregationsByObjectsDTO {
  doc_count: number;
  key: string;
}

export interface CategoriesResponseDTO {
  items: Array<CategoryShortDTO>;
  nextToken: string;
  total: number;
}

export interface ListShortObjectsResponseDTO {
  items: Array<ObjectShortDTO>;
}

export interface ObjectsForCategoriesResponseDTO {
  [key: string]: ListShortObjectsResponseDTO;
}

export type CategoriesAggregationsByObjectsResponseDTO =
  Array<CategoryAggregationsByObjectsDTO>;

export interface FiltersParams {
  filter?: {
    categories?: string[];
    googleRating?: string;
    regions?: string[];
    statuses?: string | string[];
  };
}

export type ObjectFiltersAggregationsDTO = {
  categories: {
    facets: {
      buckets: CategoryAggregationsByObjectsDTO[];
    };
  };
  regions: {
    facets: {
      buckets: CategoryAggregationsByObjectsDTO[];
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

export interface ObjectFiltersDataDTO {
  total: number;
  googleRatings: {key: string; from: string}[];
  aggregations: ObjectFiltersAggregationsDTO;
}

export interface RegionItemDTO {
  id: string;
  value: string;
  i18n: Partial<I18nType<keyof RegionItemDTO>>[];
}

export interface CategoryFilterItemDTO {
  i18n: Array<I18nType<'name'>>;
  name: string;
  id: string;
  index: number;
}

export type ObjectFiltersDataResponseDTO = {
  filterLandingObjects: ObjectFiltersDataDTO;
};

export type RegionsListResponseDTO = Array<RegionItemDTO>;

export type FiltersCategoriesResponseDTO = {
  items: Array<CategoryFilterItemDTO>;
};

export type AppMapObjectsTotalCountResponseDTO = {total: number};

export type AppMapObjectsResponseDTO = {items: Array<ObjectMapDTO>};

export interface PaginatedList<T> {
  data: Array<T>;
  nextToken: string;
  total: number;
}
export type SearchObjectsResponseDTO = {
  items: Array<SearchObjectDTO>;
  nextToken: string | null;
  total: number;
};

export type SearchObjectsHistoryResponseDTO = {
  items: Array<SearchObjectDTO>;
};

export type CalculatedProperties = {
  averageSpentTime: number | null;
  averageRating: number | null;
  totalRatings: number | null;
};

export type ObjectDetailsCategory = {
  name: string;
  parent: string | null;
  id: string;
  icon: string;
  singularName: string;
  completenessFields: ObjectField[];
};

export type Origin = {
  name: string;
  value: string;
};

export type ObjectDetailsResponseDTO = {
  accommodationPlace: {
    items: AccommodationPlaceItem[];
  };
  addresses: AddressessDTO;
  area: MultiPolygon;
  attendanceTime: number | null;
  belongsTo: {
    items: BelongsToItem[];
  };
  calculatedProperties: CalculatedProperties | null;
  category: ObjectDetailsCategory;
  childServices: {
    items: ChildServicesItem[];
  };
  description: string;
  dinnerPlaces: {
    items: DinnerPlacesItem[];
  };
  name: string;
  id: string;
  workingHours: string | null;
  googleRating: number | null;
  googleRatingsTotal: number | null;
  images: string[];
  i18n: Array<I18nType<'name' | 'description'>>;
  renting: {
    items: RentingItem[];
  };
  length: number | null;
  location: LocationDTO | null;
  origins: Origin[];
  phoneNumber: string[] | null;
  routes: LineString | null;
  include: {
    items: IncludeItem[];
  };
  upcomingEvents: {
    items: UpcomingEventsItem[];
  };
  url: string | null;
};
