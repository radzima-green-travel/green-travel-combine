import {ILabelError, SupportedLocales} from 'core/types';
import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS, THEME_TYPE} from '../constants';

interface IDefaultState {
  language: SupportedLocales | null;
  theme: THEME_TYPE | null;
}

const defaultState = {
  language: null,
  theme: null,
};

export const changeLanguageRequest = createAction(
  ACTIONS.CHANGE_LANGUAGE_REQUEST,
)<SupportedLocales>();
export const changeLanguageSuccess = createAction(
  ACTIONS.CHANGE_LANGUAGE_SUCESS,
)<SupportedLocales>();
export const changeLanguageFailure = createAction(
  ACTIONS.CHANGE_LANGUAGE_FAILURE,
)<ILabelError>();

export const setTheme = createAction(ACTIONS.SET_THEME)<THEME_TYPE | null>();

const actions = {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  setTheme,
};

export const settingsReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(changeLanguageRequest, state => {
    return {
      ...state,
      language: null,
    };
  })
  .handleAction(changeLanguageSuccess, (state, {payload}) => {
    return {
      ...state,
      language: payload,
    };
  })
  .handleAction(changeLanguageFailure, state => {
    return {
      ...state,
    };
  })
  .handleAction(setTheme, (state, {payload}) => {
    return {
      ...state,
      theme: payload,
    };
  });
