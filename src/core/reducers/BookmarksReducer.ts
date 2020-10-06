import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {IObject, ILabelError, IBookmarksIds} from '../types';

export const getObjectsForBookmarkRequest = createAction(
  ACTIONS.GET_OBJECTS_FOR_BOOKMARK_REQUEST,
)<string[]>();
export const getObjectsForBookmarkSuccess = createAction(
  ACTIONS.GET_OBJECTS_FOR_BOOKMARK_SUCCESS,
)<IObject[]>();
export const getObjectsForBookmarkFailure = createAction(
  ACTIONS.GET_OBJECTS_FOR_BOOKMARK_FAILURE,
)<ILabelError>();

export const addToBookmarksRequest = createAction(
  ACTIONS.ADD_TO_BOOKMARKS_REQUEST,
)<IAddToBookmarks>();
export const addToBookmarksSuccess = createAction(
  ACTIONS.ADD_TO_BOOKMARKS_SUCCESS,
)<IAddToBookmarksSuccess | null>();
export const addToBookmarksFailure = createAction(
  ACTIONS.ADD_TO_BOOKMARKS_FAILURE,
)<ILabelError>();

export const getSavedBookmarksIdsRequest = createAction(
  ACTIONS.GET_SAVED_BOOKMARKS_IDS_REQUEST,
)();
export const getSavedBookmarksIdsSuccess = createAction(
  ACTIONS.GET_SAVED_BOOKMARKS_IDS_SUCCESS,
)<IBookmarksIds | null>();
export const getSavedBookmarksIdsFailure = createAction(
  ACTIONS.GET_SAVED_BOOKMARKS_IDS_FAILURE,
)<ILabelError>();

export interface IAddToBookmarks {
  needToAdd: boolean;
  categoryId: string;
  objectId: string;
}

export interface IAddToBookmarksSuccess {
  [key: string]: string[];
}

interface IDefaultState {
  data: IObject[] | null;
  savedBookmarksIds: IBookmarksIds | null;
}

const defaultState = {
  data: null,
  savedBookmarksIds: null,
};

const actions = {
  getObjectsForBookmarkSuccess,
  addToBookmarksSuccess,
  getSavedBookmarksIdsSuccess,
};

export const bookmarksReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(getObjectsForBookmarkSuccess, (state, {payload}) => {
    return {
      ...state,
      data: payload,
    };
  })
  .handleAction(getSavedBookmarksIdsSuccess, (state, {payload}) => {
    return {
      ...state,
      savedBookmarksIds: payload,
    };
  })
  .handleAction(addToBookmarksSuccess, (state, {payload}) => {
    if (!state.savedBookmarksIds || !payload) {
      return state;
    }

    return {
      ...state,
      savedBookmarksIds: {
        ...state.savedBookmarksIds,
        ...payload,
      },
    };
  });
