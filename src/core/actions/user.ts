import {createAction} from '@reduxjs/toolkit';

export const addObjectIdToUserSearchHistory = createAction<string>(
  'ADD_OBJECT_ID_TO_USER_SEARCH_HISTORY',
);

export const deleteObjectIdFromUserSearchHistory = createAction<string>(
  'DELETE_OBJECT_ID_FROM_USER_SEARCH_HISTORY',
);

export const deleteAllFromUserSearchHistory = createAction(
  'DELETE_All_FROM_USER_SEARCH_HISTORY',
);
