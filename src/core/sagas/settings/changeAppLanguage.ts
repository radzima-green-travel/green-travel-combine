import {call, put} from 'redux-saga/effects';

import {languageService} from 'services/LanguageService';
import {resetEtagsStorage} from 'storage';
import {ActionType} from 'typesafe-actions';
import {
  changeLanguageRequest,
  changeLanguageSuccess,
  changeLanguageFailure,
  getInitialHomeDataRequest,
  getHomeData,
} from '../../reducers';
import {ILabelError} from 'core/types';

export function* changeAppLanguageSaga({
  payload: language,
}: ActionType<typeof changeLanguageRequest>) {
  try {
    const currentAppLocale = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);

    const isLocaledUpdated = language !== currentAppLocale;

    if (isLocaledUpdated) {
      yield call(resetEtagsStorage);
      yield put(getInitialHomeDataRequest());
    } else {
      yield put(getHomeData());
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
