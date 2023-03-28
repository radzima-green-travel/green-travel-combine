import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {IBookmarksIds, Favorites, UpdateFavoritesBody} from '../types';

export const syncAndGetFavoritesRequst = createAction(
  ACTIONS.SYNC_AND_GET_FAVORITES_REQUEST,
)();
export const syncAndGetFavoritesSuccess = createAction(
  ACTIONS.SYNC_AND_GET_FAVORITES_SUCCESS,
)<Favorites>();
export const syncAndGetFavoritesFailure = createAction(
  ACTIONS.SYNC_AND_GET_FAVORITES_FAILURE,
)<Error>();

export const updateFavoritesRequest = createAction(
  ACTIONS.UPDATE_FAVORITES_REQUEST,
)<{objectId: string; data: UpdateFavoritesBody}>();

export const updateFavoritesSuccess = createAction(
  ACTIONS.UPDATE_FAVORITES_SUCCESS,
)();

export const updateFavoritesFailure = createAction(
  ACTIONS.UPDATE_FAVORITES_FAILURE,
)<Error>();

export const setMigratedFavoritesAndClearLegacyIds = createAction(
  ACTIONS.SET_MIGRATED_FAVORITES_AND_CLEAR_LEGACY_IDS,
)<Favorites>();

export const clearFavorites = createAction(ACTIONS.CLEAR_FAVORITES)();

interface IDefaultState {
  bookmarksIds: IBookmarksIds;
  favorites: Favorites;
}

const defaultState = {
  bookmarksIds: [],
  favorites: {},
};

const actions = {
  updateFavoritesRequest,
  syncAndGetFavoritesSuccess,
  clearFavorites,
  setMigratedFavoritesAndClearLegacyIds,
};

export const bookmarksReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(syncAndGetFavoritesSuccess, (state, {payload}) => {
    return {
      ...state,
      favorites: payload,
    };
  })
  .handleAction(updateFavoritesRequest, (state, {payload}) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        [payload.objectId]: [payload.data.status, payload.data.timestamp],
      },
    };
  })
  .handleAction(clearFavorites, state => ({
    ...state,
    favorites: {},
  }))
  .handleAction(setMigratedFavoritesAndClearLegacyIds, (state, {payload}) => ({
    ...state,
    bookmarksIds: [],
    favorites: payload,
  }));
