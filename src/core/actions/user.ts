import { createAction } from '@reduxjs/toolkit';
import { Bookmarks, UpdateBookmarksBody, Location } from 'core/types';
import { createAsyncAction } from 'core/helpers';

interface UpdateBookmarksRequestPayload {
  objectId: string;
  data: UpdateBookmarksBody;
}

export const addObjectIdToUserSearchHistory = createAction<string>(
  'ADD_OBJECT_ID_TO_USER_SEARCH_HISTORY',
);

export const deleteObjectIdFromUserSearchHistory = createAction<string>(
  'DELETE_OBJECT_ID_FROM_USER_SEARCH_HISTORY',
);

export const deleteAllFromUserSearchHistory = createAction(
  'DELETE_All_FROM_USER_SEARCH_HISTORY',
);

export const syncAndGetBookmarksRequest = createAsyncAction<void, Bookmarks>(
  'SYNC_AND_GET_BOOKMARKS_REQUEST',
);

export const updateBookmarksRequest =
  createAsyncAction<UpdateBookmarksRequestPayload>('UPDATE_BOOKMARKS_REQUEST');

export const clearBookmarks = createAction('CLEAR_BOOKMARKS');

export const requestUserLocation = createAsyncAction<void, Location>(
  'REQUEST_USER_LOCATION',
);
