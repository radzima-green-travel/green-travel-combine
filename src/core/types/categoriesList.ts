import {CategoryShortDTO, PaginatedList} from './api';
import {CategoryShort} from './common';

export type PaginatedCategoriesList = PaginatedList<CategoryShortDTO> & {
  requestedItemsCount: number;
};

export type ProcessedPaginatedCategoriesList = PaginatedList<CategoryShort> & {
  requestedItemsCount: number;
};

export type CategoriesListsById = Record<string, PaginatedCategoriesList>;

export type ProcessedCategoriesListsById = Record<
  string,
  ProcessedPaginatedCategoriesList
>;
