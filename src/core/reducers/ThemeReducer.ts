import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS, THEMES} from '../constants';

interface IDefaultState {
  theme: THEMES | null;
}

const defaultState = {
  theme: null,
};

export const setTheme = createAction(ACTIONS.SET_THEME)<THEMES>();
export const setDefaultTheme = createAction(ACTIONS.SET_DEFAULT_THEME)();

const actions = {
  setTheme,
  setDefaultTheme,
};

export const themeReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(setTheme, (state, {payload}) => {
    return {
      ...state,
      theme: payload,
    };
  })
  .handleAction(setDefaultTheme, state => {
    return {...state, theme: THEMES.SYSTEM};
  });
