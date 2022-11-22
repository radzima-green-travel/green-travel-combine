import {call} from 'redux-saga/effects';

import {getAppPrevThemeFromStorage} from 'storage';

export function* initAppThemeSaga() {
  const prevAppTheme: string | null = yield call(getAppPrevThemeFromStorage);

  return prevAppTheme;
}
