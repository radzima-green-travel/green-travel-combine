import {call, put, select} from 'redux-saga/effects';

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
import {Auth} from 'aws-amplify';

export function* changeAppLanguageSaga({
  payload: {language, isSystemLanguage},
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
      const user = yield call([Auth, Auth.currentAuthenticatedUser]);

      yield call([Auth, Auth.updateUserAttributes], user, {
        'custom:locale': language,
      });
    }

    yield put(changeLanguageSuccess());
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError));
  }
}
