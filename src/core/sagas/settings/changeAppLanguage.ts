import {call, put, select, spawn} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {changeLanguageRequest, setLanguage} from 'core/actions';
import {ILabelError, SupportedLocales} from 'core/types';
import {selectUserAuthorized} from 'core/selectors';
import {updateUserAttributesSaga} from '../authentification/updateUserAttributesSaga';

export function* changeAppLanguageSaga({
  payload: {language, isSystemLanguage},
  meta: {entityId, successAction, failureAction},
}: ReturnType<typeof changeLanguageRequest>) {
  let nextLanguage = language;

  try {
    const isUserAuthorized = yield select(selectUserAuthorized);

    if (isSystemLanguage) {
      nextLanguage = yield call([
        languageService,
        languageService.getCurrentLanguage,
      ]);
    }

    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      nextLanguage as SupportedLocales,
    );

    yield put(
      setLanguage({
        language: nextLanguage,
        isSystemLanguage,
      }),
    );

    if (isUserAuthorized) {
      yield spawn(updateUserAttributesSaga, {
        locale: language as SupportedLocales,
      });
    }

    yield put(successAction(undefined, {entityId}));
  } catch (e) {
    yield put(
      failureAction(e as ILabelError, {
        entityId,
      }),
    );
  }
}
