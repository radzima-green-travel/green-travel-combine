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

export interface CategoryAggregationsByObjectsDTO {
  doc_count: number;
  key: string;
}

export interface RegionItem {
  id: string;
  value: string;
}

export interface ListCategoriesResponseDTO {
  items: Array<CategoryShortDTO>;
}

export interface ListShortObjectsResponseDTO {
  items: Array<ObjectShortDTO>;
}

export interface ObjectsForCategoriesResponseDTO {
  [key: string]: ListShortObjectsResponseDTO;
}

export type CategoriesAggregationsByObjectsResponseDTO =
  Array<CategoryAggregationsByObjectsDTO>;

export type RegionsList = Array<RegionItem>;

export interface SearchParams {
  filter: {
    categories?: string[] | null;
    googleRating?: string | null;
    regions?: string[] | null;
    municipalities?: string | string[];
    statuses?: string | string[];
  };
}

export type AppMapObjectsTotalCountResponseDTO = {total: number};

export type AppMapObjectsResponseDTO = {items: Array<ObjectMapDTO>};
