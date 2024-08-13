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
    (state, {payload: {data, categoryId}}) => {
      const existingData = state.objectsList[categoryId] ?? [];

      state.objectsList = {
        ...state.objectsList,
        [categoryId]: [...existingData, ...data],
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
