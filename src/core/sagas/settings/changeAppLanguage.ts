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
import {selectAppLanguage} from 'core/selectors';
import {getInitialHomeDataSaga} from '../home/getInitialHomeDataSaga';
import {resetEtags} from 'api/rest/interceptors';

export function* changeAppLanguageSaga({
  payload: {language, isSystemLanguage},
}: ActionType<typeof changeLanguageRequest>) {
  let nextLanguage = language;

  try {
    const prevLanguage = yield select(selectAppLanguage);

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

    yield put(changeLanguageSuccess());
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError));
  }
}
