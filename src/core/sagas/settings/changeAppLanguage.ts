import {call, put, select, spawn} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {ActionType} from 'typesafe-actions';
import {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  setLanguage,
} from '../../reducers';
import {ILabelError, SupportedLocales} from 'core/types';
import {selectAppLanguage, selectUserAuthorized} from 'core/selectors';
import {getInitialHomeDataSaga} from '../home/getInitialHomeDataSaga';
import {resetEtags} from 'api/rest/interceptors';
import {updateUserAttributesSaga} from '../authentification/updateUserAttributesSaga';

export function* changeAppLanguageSaga({
  payload: {language, isSystemLanguage},
  meta: {entityId},
}: ActionType<typeof changeLanguageRequest>) {
  let nextLanguage = language;

  try {
    const prevLanguage = yield select(selectAppLanguage);
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

    const isLocaledUpdated = nextLanguage !== prevLanguage;

    yield put(
      setLanguage({
        language: nextLanguage,
        isSystemLanguage,
      }),
    );

    if (isLocaledUpdated) {
      yield call(resetEtags);
      yield call(getInitialHomeDataSaga);
    }
    if (isUserAuthorized) {
      yield spawn(updateUserAttributesSaga, {
        locale: language as SupportedLocales,
      });
    }

    yield put(changeLanguageSuccess(undefined, {entityId: entityId}));
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError, {entityId: entityId}));
  }
}
