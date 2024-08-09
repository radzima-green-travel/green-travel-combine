import {
  BookmarksCategory,
  BookmarksObjectDTO,
  ExtractI18nKeys,
  ObjectShortDTO,
} from 'core/types/api';
import {ObjectShort} from 'core/types/common';

export interface BookmarksInitialObjectsDataState {
  objects: BookmarksObjectDTO[];
  objectsIds: string[];
}

interface ProcessedBookmarksObjectCategory extends BookmarksCategory {
  analyticsMetadata: Record<ExtractI18nKeys<BookmarksCategory>, string>;
}

interface ProcessedBookmarksInitialObject {
  id: string;
  category: ProcessedBookmarksObjectCategory;
}

export interface ProcessedBookmarksInitialObjectsData {
  objects: ProcessedBookmarksInitialObject[];
  objectsIds: string[];
}

export type BookmarksObjectsListState = Record<string, ObjectShortDTO[]>;

export type ProcessedBookmarksObjectsList = Record<string, ObjectShort[]>;
