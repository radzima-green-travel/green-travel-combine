import {SupportedLocales} from 'core/types';
import {call, put, select} from 'redux-saga/effects';
import {languageService} from 'services/LanguageService';
import {getAppPrevLocaleFromStorage, setAppPrevLocaleToStorage} from 'storage';
import {
  getHomeDataUpdateAvailableRequest,
  getInitialHomeDataRequest,
} from '../../reducers';
import {selectIsHomeDataExists} from '../../selectors';

export function* getHomeDataSaga() {
  const isHomeDataExists = yield select(selectIsHomeDataExists);
  const prevAppLocale: SupportedLocales | null = yield call(
    getAppPrevLocaleFromStorage,
  );
  const currentAppLocale: SupportedLocales = yield call([
    languageService,
    languageService.getCurrentLanguage,
  ]);
  const isLanguageChanged = prevAppLocale !== currentAppLocale;

  if (isHomeDataExists && !isLanguageChanged) {
    yield put(getHomeDataUpdateAvailableRequest());
  } else {
    yield put(getInitialHomeDataRequest());
  }

  yield call(setAppPrevLocaleToStorage, currentAppLocale);
}
