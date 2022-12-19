import {call, put, select} from 'redux-saga/effects';

import {SupportedLocales} from 'core/types';
import {languageService} from 'services/LanguageService';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {changeLanguageRequest} from 'core/reducers';

export function* initAppLocaleSaga() {
  let isLocaledUpdated = false;
  const language = yield select(selectAppLanguage);
  const isSystemLanguage = yield select(selectIsSystemLanguage);

  yield put(
    changeLanguageRequest({
      language,
      isSystemLanguage,
    }),
  );

  if (isSystemLanguage) {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    isLocaledUpdated = language !== currentAppLocale;
  }

  return isLocaledUpdated;
}
