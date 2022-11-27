import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS, THEME_TYPE} from '../constants';

interface IDefaultState {
  theme: THEME_TYPE | null;
}

const defaultState = {
  theme: null,
};

export const setTheme = createAction(ACTIONS.SET_THEME)<THEME_TYPE | null>();

const actions = {
  setTheme,
};

export const themeReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState).handleAction(setTheme, (state, {payload}) => {
  return {
    ...state,
    theme: payload,
  };
});
