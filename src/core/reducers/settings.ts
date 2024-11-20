import {SupportedLocales} from 'core/types';
import {createReducer} from '@reduxjs/toolkit';
import {setLanguage, setTheme} from 'core/actions';
import {THEME_TYPE} from 'core/constants';

interface InitialState {
  language: SupportedLocales | null;
  theme: THEME_TYPE | null;
  isSystemLanguage: boolean | null;
}

const initialState: InitialState = {
  language: null,
  theme: null,
  isSystemLanguage: null,
};

export const settingsReducer = createReducer(initialState, builder => {
  builder
    .addCase(setLanguage, (state, {payload}) => ({
      ...state,
      language: payload.language,
      isSystemLanguage: payload.isSystemLanguage,
    }))
    .addCase(setTheme, (state, {payload}) => ({
      ...state,
      theme: payload,
    }));
});
