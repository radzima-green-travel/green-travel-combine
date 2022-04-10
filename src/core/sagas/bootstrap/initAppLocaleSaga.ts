import {call} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {getAppPrevLocaleFromStorage, setAppPrevLocaleToStorage} from 'storage';
import {languageService} from 'services/LanguageService';

export function* initAppLocaleSaga() {
  const prevAppLocale: SupportedLocales | null = yield call(
    getAppPrevLocaleFromStorage,
  );
  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);
  const isLanguageChanged = prevAppLocale !== currentAppLocale;

  if (isLanguageChanged) {
    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      currentAppLocale,
    );
  }

  yield call(setAppPrevLocaleToStorage, currentAppLocale);

  return isLanguageChanged;
}
