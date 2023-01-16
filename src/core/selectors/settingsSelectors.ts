import {IState} from 'core/store';

export const selectAppTheme = (state: IState) => state.settings.theme;
export const selectAppLanguage = (state: IState) => state.settings.language;
export const selectIsSystemLanguage = (state: IState) =>
  state.settings.isSystemLanguage;
