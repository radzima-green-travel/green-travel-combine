import { createAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'core/helpers';
import { ACTIONS, THEME_TYPE } from 'core/constants';
import { ILabelError, SupportedLocales } from 'core/types';

export const setLanguage = createAction<{
  language: SupportedLocales | null;
  isSystemLanguage: boolean;
}>(ACTIONS.SET_LANGUAGE);

export const changeLanguageRequest = createAsyncAction<
  { language: SupportedLocales | null; isSystemLanguage: boolean },
  void,
  ILabelError
>(ACTIONS.CHANGE_LANGUAGE);

export const clearCacheRequest = createAsyncAction<void, void, ILabelError>(
  ACTIONS.CLEAR_CACHE,
);

export const setTheme = createAction<THEME_TYPE | null>(ACTIONS.SET_THEME);
