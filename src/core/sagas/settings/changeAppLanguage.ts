import {call, put} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {resetEtagsStorage} from 'storage';
import {ActionType} from 'typesafe-actions';
import {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  getInitialHomeDataRequest,
} from '../../reducers';
import {ILabelError, SupportedLocales} from 'core/types';

export function* changeAppLanguageSaga({
  payload: language,
}: ActionType<typeof changeLanguageRequest>) {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);

    const isLocaledUpdated = language !== currentAppLocale;

    if (isLocaledUpdated) {
      yield call(resetEtagsStorage);
      yield call(getInitialHomeDataRequest);
    }

    if (!language) {
      const systemLanguage: SupportedLocales = yield call([
        languageService,
        languageService.getSystemLanguage,
      ]);

      yield call(
        [languageService, languageService.setTranslationsCurrentLanguage],
        systemLanguage,
      );

      return yield put(changeLanguageSuccess(null));
    }

    yield call(
      [languageService, languageService.setTranslationsCurrentLanguage],
      language,
    );
    yield put(changeLanguageSuccess(language));
  } catch (e) {
    yield put(changeLanguageFailure(e as ILabelError));
  }
}
