import {call, put, select} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {languageService} from 'services/LanguageService';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {changeLanguageRequest} from 'core/reducers';

export function* initAppLocaleSaga() {
  const language = yield select(selectAppLanguage);
  const isSystemLanguage = yield select(selectIsSystemLanguage);

  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);

  const isLocaledUpdated = language !== currentAppLocale;

  yield put(changeLanguageRequest({language, isSystemLanguage}));
  return isLocaledUpdated;
}
