import { takeLatest } from 'redux-saga/effects';

import { changeLanguageRequest, clearCacheRequest } from 'core/actions';
import { changeAppLanguageSaga } from './changeAppLanguage';
import { clearCacheSaga } from './clearCacheSaga';

export function* settingsSaga() {
  yield takeLatest(changeLanguageRequest, changeAppLanguageSaga);
  yield takeLatest(clearCacheRequest, clearCacheSaga);
}
