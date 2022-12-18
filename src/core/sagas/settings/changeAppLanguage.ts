import {call, put} from 'redux-saga/effects';

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

export function* changeAppLanguageSaga({
  payload: {language, isSystemLanguage},
}: ActionType<typeof changeLanguageRequest>) {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);

    const isLocaledUpdated = language !== currentAppLocale;

    if (isLocaledUpdated) {
      yield call(resetEtagsStorage);
    }

    if (!language) {
      language = currentAppLocale;
      isSystemLanguage = true;
    }

    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      language,
    );

    yield put(changeLanguageSuccess({language, isSystemLanguage}));
    yield put(getHomeDataUpdatesRequest());
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError));
  }
}
