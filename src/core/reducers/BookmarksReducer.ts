import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {IBookmarksIds} from '../types';

export const addToFavorite = createAction(ACTIONS.ADD_TO_FAVORITE)<string>();
export const removeFromFavorite = createAction(ACTIONS.REMOVE_FROM_FAVORITE)<
  string
>();

interface IDefaultState {
  bookmarksIds: IBookmarksIds;
}

const defaultState = {
  bookmarksIds: [],
};

const actions = {
  addToFavorite,
  removeFromFavorite,
};

export const bookmarksReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(addToFavorite, (state, {payload}) => {
    return {
      ...state,
      bookmarksIds: [...state.bookmarksIds, payload],
    };
  })
  .handleAction(removeFromFavorite, (state, {payload}) => {
    return {
      ...state,
      bookmarksIds: state.bookmarksIds.filter((id) => id !== payload),
    };
  });
