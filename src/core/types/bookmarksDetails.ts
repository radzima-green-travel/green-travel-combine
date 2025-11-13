import {
  BookmarksCategory,
  BookmarksObjectDTO,
  ObjectShortDTO,
} from 'core/types/api';
import { ObjectShort, TranslatedEntity } from 'core/types/common';

export interface BookmarksInitialObjectsDataState {
  objects: BookmarksObjectDTO[];
  objectsIds: string[];
}

interface ProcessedBookmarksObjectCategory
  extends TranslatedEntity<BookmarksCategory> {}

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
