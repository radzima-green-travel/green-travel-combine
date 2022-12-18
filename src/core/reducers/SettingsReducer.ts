import {ILabelError, SupportedLocales} from 'core/types';
import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS, THEME_TYPE} from '../constants';

interface IDefaultState {
  language: SupportedLocales | null;
  theme: THEME_TYPE | null;
  isSystemLanguage: boolean;
}

const defaultState = {
  language: null,
  theme: null,
  isSystemLanguage: false,
};

export const changeLanguageRequest = createAction(
  ACTIONS.CHANGE_LANGUAGE_REQUEST,
)<{language: SupportedLocales | null; isSystemLanguage: boolean}>();
export const changeLanguageSuccess = createAction(
  ACTIONS.CHANGE_LANGUAGE_SUCCESS,
)<{language: SupportedLocales | null; isSystemLanguage: boolean}>();
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
  .handleAction(changeLanguageSuccess, (state, {payload}) => {
    return {
      ...state,
      language: payload.language,
      isSystemLanguage: payload.isSystemLanguage,
    };
  })
  .handleAction(setTheme, (state, {payload}) => {
    return {
      ...state,
      theme: payload,
    };
  });
