import {createReducer} from '@reduxjs/toolkit';
import {
  getBookmarksObjectsListRequest,
  clearBookmarksInitialObjectsData,
  getBookmarksInitialObjectsDataRequest,
} from 'core/actions';
import {
  BookmarksObjectsListState,
  BookmarksInitialObjectsDataState,
} from 'core/types/bookmarksDetails';

interface BookmarksDetailsState {
  objectsList: BookmarksObjectsListState;
  initialObjectsData: BookmarksInitialObjectsDataState;
}

const initialState: BookmarksDetailsState = {
  objectsList: {},
  initialObjectsData: {
    objectsIds: [],
    objects: [],
  },
};

export const bookmarksDetailsReducer = createReducer(initialState, builder => {
  builder.addCase(
    getBookmarksObjectsListRequest.meta.successAction,
    (state, {payload: {data, id}}) => {
      const existingData = state.objectsList[id] ?? [];

      state.objectsList = {
        ...state.objectsList,
        [id]: [...existingData, ...data],
      };
    },
  );
  builder.addCase(
    getBookmarksInitialObjectsDataRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      initialObjectsData: payload,
    }),
  );
  builder.addCase(clearBookmarksInitialObjectsData, state => ({
    ...state,
    initialObjectsData: initialState.initialObjectsData,
  }));
});
