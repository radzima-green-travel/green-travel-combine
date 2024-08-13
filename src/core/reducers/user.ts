import {createReducer} from '@reduxjs/toolkit';
import {
  addObjectIdToUserSearchHistory,
  clearBookmarks,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
  syncAndGetBookmarksRequest,
  updateBookmarksRequest,
} from 'core/actions';
import {filter, uniq} from 'lodash';
import {Bookmarks} from 'core/types';

interface UserState {
  historyIds: string[];
  bookmarks: Bookmarks;
}

const initialState: UserState = {
  historyIds: [],
  bookmarks: {},
};
export const userReducer = createReducer(initialState, builder => {
  builder.addCase(addObjectIdToUserSearchHistory, (state, {payload}) => ({
    ...state,
    historyIds: uniq([...state.historyIds, payload]),
  }));
  builder.addCase(deleteObjectIdFromUserSearchHistory, (state, {payload}) => ({
    ...state,
    historyIds: filter(state.historyIds, item => item !== payload),
  }));
  builder.addCase(deleteAllFromUserSearchHistory, state => ({
    ...state,
    historyIds: [],
  }));
  builder.addCase(updateBookmarksRequest, (state, {payload}) => ({
    ...state,
    bookmarks: {
      ...state.bookmarks,
      [payload.objectId]: [payload.data.status, payload.data.timestamp],
    },
  }));
  builder.addCase(
    syncAndGetBookmarksRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      bookmarks: payload,
    }),
  );
  builder.addCase(clearBookmarks, state => ({
    ...state,
    bookmarks: {},
  }));
});
