import {call, put, select} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {languageService} from 'services/LanguageService';
import {selectAppLanguage} from 'core/selectors';
import {changeLanguageRequest} from 'core/reducers';

export function* initAppLocaleSaga() {
  const prevAppLocale = yield select(selectAppLanguage);

  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);

  const isLocaledUpdated = prevAppLocale ? prevAppLocale : currentAppLocale;

  yield put(changeLanguageRequest(prevAppLocale));
  return isLocaledUpdated;
}
