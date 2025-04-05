import {ObjectShortDTO, PaginatedList} from './api';
import {ObjectShort} from './common';

export type ObjectsListsById = Record<string, PaginatedList<ObjectShortDTO>>;

export type ProcessedObjectsListsById = Record<
  string,
  PaginatedList<ObjectShort>
>;

export type ObjectListFilters = Partial<{
  categoryId: string;
  objectsIds: string[];
  markedAsNotOnGoogleMaps: boolean;
}>;
