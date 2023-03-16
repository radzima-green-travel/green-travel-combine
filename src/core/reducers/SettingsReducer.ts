import {ILabelError, SupportedLocales} from 'core/types';
import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS, THEME_TYPE} from '../constants';

interface IDefaultState {
  language: SupportedLocales | null;
  theme: THEME_TYPE | null;
  isSystemLanguage: boolean | null;
}

const defaultState = {
  language: null,
  theme: null,
  isSystemLanguage: null,
};

export const setLanguage = createAction(ACTIONS.SET_LANGUAGE)<{
  language: SupportedLocales | null;
  isSystemLanguage: boolean;
}>();
export const changeLanguageRequest = createAction(
  ACTIONS.CHANGE_LANGUAGE_REQUEST,
)<{language: SupportedLocales | null; isSystemLanguage: boolean}>();
export const changeLanguageSuccess = createAction(
  ACTIONS.CHANGE_LANGUAGE_SUCCESS,
)();
export const changeLanguageFailure = createAction(
  ACTIONS.CHANGE_LANGUAGE_FAILURE,
)<ILabelError>();
export const clearCacheRequest = createAction(ACTIONS.CLEAR_CACHE_REQUEST)();
export const clearCacheRequestSuccess = createAction(
  ACTIONS.CLEAR_CACHE_SUCCESS,
)();
export const clearCacheRequestFailure = createAction(
  ACTIONS.CLEAR_CACHE_FAILURE,
)<ILabelError>();

export const setTheme = createAction(ACTIONS.SET_THEME)<THEME_TYPE | null>();

const actions = {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  setLanguage,
  setTheme,
};

export const settingsReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(setLanguage, (state, {payload}) => {
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
