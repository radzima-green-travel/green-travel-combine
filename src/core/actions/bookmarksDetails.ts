import {createAsyncAction} from 'core/helpers';
import {BookmarksObjectDTO} from 'core/types';
import {ObjectsListSuccessPayload} from 'core/actions/objectsList';
import {createAction} from '@reduxjs/toolkit';

interface BookmarksInitialObjectsDataSuccessPayload {
  objects: BookmarksObjectDTO[];
  objectsIds: string[];
}

interface BookmarksObjectsListPayload {
  objectsIds: string[];
  categoryId: string;
}

export const getBookmarksObjectsListRequest = createAsyncAction<
  BookmarksObjectsListPayload,
  ObjectsListSuccessPayload
>('GET_BOOKMARKS_OBJECTS_LIST');

export const getBookmarksInitialObjectsDataRequest = createAsyncAction<
  string[],
  BookmarksInitialObjectsDataSuccessPayload
>('GET_BOOKMARKS_INITIAL_OBJECTS_DATA');

export const clearBookmarksInitialObjectsData = createAction(
  'CLEAR_BOOKMARKS_INITIAL_OBJECTS_DATA',
);
