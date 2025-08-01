import {createReducer} from '@reduxjs/toolkit';
import {
  addObjectIdToUserSearchHistory,
  clearBookmarks,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
  getSearchObjectsHistoryRequest,
  requestUserLocation,
  syncAndGetBookmarksRequest,
  updateBookmarksRequest,
} from 'core/actions';
import {filter, some, uniq} from 'lodash';
import {Bookmarks, Location} from 'core/types';

interface UserState {
  historyIds: string[];
  bookmarks: Bookmarks;
  location?: Location;
}

const initialState: UserState = {
  historyIds: [],
  bookmarks: {},
};
export const userReducer = createReducer(initialState, builder => {
  builder.addCase(addObjectIdToUserSearchHistory, (state, {payload}) => ({
    ...state,
    historyIds: uniq([payload, ...state.historyIds]),
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
  builder.addCase(
    requestUserLocation.meta.successAction,
    (state, {payload}) => {
      return {
        ...state,
        location: payload,
      };
    },
  );
  builder.addCase(
    getSearchObjectsHistoryRequest.meta.successAction,
    (state, {payload}) => {
      state.historyIds = filter(state.historyIds, item => {
        return some(
          payload.searchHistoryObjects,
          historyItem => historyItem.id === item,
        );
      });
    },
  );
});
