import {MultiPolygon, LineString} from '@turf/helpers';
import {ObjectField} from 'core/constants';
import {SupportedLocales} from '../common';

export type QueryParams = Partial<{
  limit: number;
  nextToken: string | null;
  filter: Partial<{
    parent: {
      eq?: string;
    };
    categories: string[];
    ids: string[];
    markedAsNotOnGoogleMaps: boolean;
    userId: string;
    googleRating: string;
    regions: string[];
    municipalities: string[];
    statuses: string | string[];
  }>;
  sort: Partial<{
    direction: 'asc' | 'desc';
    field: string;
  }>;
  from: number;
  query: string;
  km: number;
  location: {lat: number; lon: number};
  locale: SupportedLocales;
  fieldsToSearch: {isSpotIncluded: boolean; isDescriptionIncluded: boolean};
}>;

export type ObjectsListQueryParams = Pick<
  QueryParams,
  'limit' | 'filter' | 'nextToken' | 'sort'
>;

export type SettlementsQueryParams = Partial<
  Pick<QueryParams, 'limit' | 'sort' | 'from'>
> & {filter?: {value?: {matchPhrasePrefix?: string}}};

export type CategoriesListQueryParams = Partial<
  Pick<QueryParams, 'limit' | 'filter' | 'nextToken' | 'sort'>
>;

export type BookmarksInitialObjectsParams = Pick<QueryParams, 'filter'>;

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
  widgetType: 'MAIN_WIDGET' | 'ROUTES_WIDGET' | null;
  index: number;
  owner: string | null;
  icon: string;
}

export interface HighlightDTO {
  id: string;
  value: string;
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
  icon: string;
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
  id: string;
  category: ObjectCategoryMapDTO;
}

export interface SearchObjetcCategoryDTO {
  name: string;
  icon: string;
  i18n: Array<I18nType<'name'>>;
}

export interface SearchObjectDTO {
  name: string;
  id: string;
  cover: string;
  blurhash: string | null;
  i18n: Array<I18nType<'name'>>;
  category: SearchObjetcCategoryDTO;
  location: LocationDTO | null;
  addresses: AddressessDTO;
  googleRating?: number | null;
  calculatedProperties?: {
    averageRating: number | null;
    totalRatings: number | null;
  };
}

export interface CategoryAggregationsByObjectsDTO {
  doc_count: number;
  key: string;
}

export interface GoogleRatingsAggregationsByObjectsDTO {
  doc_count: number;
  from: number;
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

export type FiltersParams = Pick<
  QueryParams,
  | 'query'
  | 'nextToken'
  | 'km'
  | 'location'
  | 'locale'
  | 'filter'
  | 'fieldsToSearch'
  | 'sort'
  | 'limit'
  | 'from'
>;

export interface SettlementsParams {
  searchValue?: string;
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
  municipalities: {
    facets: {
      buckets: CategoryAggregationsByObjectsDTO[];
    };
  };
  googleRatings: {
    facets: {
      buckets: GoogleRatingsAggregationsByObjectsDTO[];
    };
  };
};

export interface ObjectFiltersDataDTO {
  total: number;
  googleRatings: {key: string; from: string}[];
  aggregations: ObjectFiltersAggregationsDTO;
}

export interface SpotItemDTO {
  id: string;
  value: string;
  i18n: Array<I18nType<'value'>>;
}

export interface CategoryFilterItemDTO {
  i18n: Array<I18nType<'name'>>;
  name: string;
  id: string;
  index: number;
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

export type RegionsListResponseDTO = Array<SpotItemDTO>;

export type SettlementsResponseDTO = {
  items: Array<SpotItemDTO>;
  nextToken: string;
  total: number;
};

export type FiltersCategoriesResponseDTO = {
  items: Array<CategoryFilterItemDTO>;
};

export interface PaginatedList<T> {
  data: Array<T>;
  nextToken: string;
  total: number;
}

type HighlightName =
  | 'name'
  | 'description_plain'
  | 'spot_region'
  | 'spot_subRegion'
  | 'spot_street'
  | 'spot_municipality';

export type Highlight = Record<HighlightName, HighlightDTO[] | null>;

export type SearchObjectsResponseDTO = {
  items: Array<SearchObjectDTO>;
  highlight: Highlight;
  nextToken: string | null;
  total: number;
};

export type SearchObjectsHistoryResponseDTO = {
  items: Array<SearchObjectDTO>;
};

export type MapSearchObjectsDTO = {
  items: Array<ObjectMapDTO>;
};

export interface CalculatedProperties {
  averageSpentTime: number | null;
  averageRating: number | null;
  totalRatings: number | null;
}

export interface ObjectDetailsCategory {
  name: string;
  parent: string | null;
  id: string;
  icon: string;
  singularName: string;
  completenessFields: ObjectField[];
}

export interface Origin {
  name: string;
  value: string;
}

export interface AccommodationPlaceItemDTO {
  name: string;
  googleMapLink: string;
  messengerLink: string;
  i18n: Array<I18nType<'name'>>;
}

export type AccommodationPlaceDTO = {
  items: Array<AccommodationPlaceItemDTO>;
};

export interface DinnerPlacesItemDTO {
  name: string;
  googleMapLink: string;
  messengerLink: string;
  i18n: Array<I18nType<'name'>>;
}

export type DinnerPlacesDTO = {
  items: Array<DinnerPlacesItemDTO>;
};

export interface UpcomingEventsItemDTO {
  name: string;
  link: string;
  date: string;
  i18n: Array<I18nType<'name'>>;
}

export type UpcomingEventsDTO = {
  items: Array<UpcomingEventsItemDTO>;
};

export interface RentingItemDTO {
  renting: {
    name: string;
    locale: string;
    i18n: Array<I18nType<'name'>>;
  };
}

export type RentingDTO = {
  items: Array<RentingItemDTO>;
};

export interface ChildServicesItemDTO {
  childService: {
    id: string;
    name: string;
    locale: string;
    i18n: Array<I18nType<'name'>>;
  };
}

export type ChildServicesDTO = {
  items: Array<ChildServicesItemDTO>;
};

export interface IncludeItemDTO {
  include: {
    cover: string;
    blurhash: string | null;
    id: string;
    category: {
      id: string;
      cover: string;
      name: string;
      i18n: Array<I18nType<'name'>>;
    };
  };
}

export type IncludeDTO = {
  items: Array<IncludeItemDTO>;
};

export interface BelongsToItemDTO {
  belongsTo: {
    blurhash: string | null;
    id: string;
    i18n: Array<I18nType<'name'>>;
    cover: string;
    name: string;
    category: {
      name: string;
      i18n: Array<I18nType<'name'>>;
    };
  };
}

export type BelongsToDTO = {
  items: Array<BelongsToItemDTO>;
};

export type ObjectDetailsResponseDTO = {
  accommodationPlace: AccommodationPlaceDTO;
  addresses: AddressessDTO;
  area: MultiPolygon;
  attendanceTime: number | null;
  belongsTo: BelongsToDTO;
  calculatedProperties: CalculatedProperties | null;
  category: ObjectDetailsCategory;
  childServices: ChildServicesDTO;
  description: string;
  dinnerPlaces: DinnerPlacesDTO;
  name: string;
  id: string;
  workingHours: string | null;
  googleRating: number | null;
  googleRatingsTotal: number | null;
  images: string[];
  i18n: Array<I18nType<'name' | 'description'>>;
  renting: RentingDTO;
  length: number | null;
  location: LocationDTO | null;
  origins: Origin[];
  phoneNumber: string[] | null;
  routes: LineString | null;
  include: IncludeDTO;
  upcomingEvents: UpcomingEventsDTO;
  url: string | null;
};

export type BookmarksCategory = Pick<SearchObjectDTO, 'name' | 'i18n' | 'id'>;

export interface BookmarksObjectDTO {
  id: string;
  category: BookmarksCategory;
}

export interface BookmarksInitialObjectsDTO {
  items: Array<BookmarksObjectDTO>;
}

export interface ObjectThumbnailDTO {
  id: string;
  blurhash: string;
  cover: string;

  name: string;
  i18n: Array<I18nType<'name'>>;
  category: {
    name: string;
    i18n: Array<I18nType<'name'>>;
  };
}

export interface PlaceOfTheWeekObjectDTO {
  id: string;
  name: string;
  i18n: Array<I18nType<'name'>>;
  category: {
    name: string;
    i18n: Array<I18nType<'name'>>;
  };
  cover: string;
  blurhash: string;
  googleRatingsTotal: number | null;
  googleRating: number | null;
  calculatedProperties: {
    averageRating: number | null;
    totalRatings: number | null;
  } | null;
}

export type AppMapObjectsQueryParams = Pick<QueryParams, 'limit' | 'from'>;
export type AppMapObjectsTotalCountResponseDTO = {total: number};

export type AppMapObjectsResponseDTO = {items: Array<ObjectMapDTO>};
