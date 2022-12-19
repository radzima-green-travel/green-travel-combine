import {call, put, select} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {selectAppLanguage, selectIsSystemLanguage} from 'core/selectors';
import {setLanguage} from 'core/reducers';

export function* initAppLocaleSaga() {
  let isLocaledUpdated = false;
  let language = yield select(selectAppLanguage);
  let isSystemLanguage = yield select(selectIsSystemLanguage);

  if (!language || isSystemLanguage) {
    const newLanguage = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    isLocaledUpdated = Boolean(language) && language !== newLanguage;
    language = newLanguage;
    isSystemLanguage = true;
  }

  yield put(
    setLanguage({
      language,
      isSystemLanguage,
    }),
  );

  return isLocaledUpdated;
}
