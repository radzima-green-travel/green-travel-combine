import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {uniq, filter} from 'lodash';

interface IDefaultState {
  history: string[];
  inputValue: string;
}

const initialState: IDefaultState = {
  history: [],
  inputValue: '',
};

export const setSearchInputValue = createAction(
  ACTIONS.SET_SEARCH_INPUT_VALUE,
)<string>();

export const addObjectToSearchHistory = createAction(
  ACTIONS.ADD_OBJECT_TO_SEARCH_HISTORY,
)<string>();

export const deleteObjectFromSearchHistory = createAction(
  ACTIONS.DELETE_OBJECT_FROM_SEARCH_HISTORY,
)<string>();

const actions = {
  addObjectToSearchHistory,
  deleteObjectFromSearchHistory,
  setSearchInputValue,
};

export const searchReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(initialState)
  .handleAction(setSearchInputValue, (state, {payload}) => ({
    ...state,
    inputValue: payload,
  }))
  .handleAction(addObjectToSearchHistory, (state, {payload}) => ({
    ...state,
    history: uniq([...state.history, payload]),
  }))
  .handleAction(deleteObjectFromSearchHistory, (state, {payload}) => ({
    ...state,
    history: filter(state.history, item => item !== payload),
  }));
