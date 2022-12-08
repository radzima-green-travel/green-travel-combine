import {call, put, select} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {languageService} from 'services/LanguageService';
import {changeLanguageRequest} from 'core/reducers';
import {selectAppLanguage} from 'core/selectors';

export function* initAppLocaleSaga() {
  const prevAppLocale = yield select(selectAppLanguage);

  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);

  const language = prevAppLocale ? prevAppLocale : currentAppLocale;

  yield put(changeLanguageRequest(language));
}
