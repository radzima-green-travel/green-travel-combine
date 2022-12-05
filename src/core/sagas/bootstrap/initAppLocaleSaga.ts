import {call, put, select} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {languageService} from 'services/LanguageService';
import {IState} from 'core/store';
import {setLang} from 'core/reducers';

export function* initAppLocaleSaga() {
  const prevAppLocale = yield select((state: IState) => state.lang.lang);

  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);
  const isLanguageChanged = prevAppLocale !== currentAppLocale;

  if (prevAppLocale) {
    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      prevAppLocale as SupportedLocales,
    );
  } else {
    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      currentAppLocale,
    );
    yield put(setLang(currentAppLocale));
  }

  return isLanguageChanged;
}
