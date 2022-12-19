import {call, put, select} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {resetEtagsStorage} from 'storage';
import {ActionType} from 'typesafe-actions';
import {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  getHomeDataUpdatesRequest,
} from '../../reducers';
import {ILabelError, SupportedLocales} from 'core/types';
import {selectAppLanguage} from 'core/selectors';

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

    yield put(
      changeLanguageSuccess({
        language: nextLanguage,
        isSystemLanguage,
      }),
    );

    const isLocaledUpdated = nextLanguage !== prevLanguage;

    if (isLocaledUpdated) {
      yield call(resetEtagsStorage);
      yield put(getHomeDataUpdatesRequest());
    }
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError));
  }
}
