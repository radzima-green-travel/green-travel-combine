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
