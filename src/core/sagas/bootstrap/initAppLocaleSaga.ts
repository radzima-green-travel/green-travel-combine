import { call, put, select } from 'redux-saga/effects';

import { languageService } from 'services/LanguageService';
import { selectAppLanguage, selectIsSystemLanguage } from 'core/selectors';
import { setLanguage } from 'core/actions';

export function* initAppLocaleSaga() {
  let language = yield select(selectAppLanguage);
  let isSystemLanguage = yield select(selectIsSystemLanguage);

  const isLanguageSupported = yield call(
    [languageService, languageService.isLanguageSupported],
    language,
  );

  if (!language || (language && !isLanguageSupported) || isSystemLanguage) {
    const newLanguage = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    language = newLanguage;
    isSystemLanguage = true;
  }

  yield put(
    setLanguage({
      language,
      isSystemLanguage,
    }),
  );

  yield call(
    [languageService, languageService.setTranslationsCurrentLanguage],
    language,
  );
}
