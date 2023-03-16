import {takeLatest} from 'redux-saga/effects';

import {ACTIONS} from '../../constants';
import {changeAppLanguageSaga} from './changeAppLanguage';
import {clearCacheSaga} from './clearCacheSaga';

export function* settingsSaga() {
  yield takeLatest(ACTIONS.CHANGE_LANGUAGE_REQUEST, changeAppLanguageSaga);
  yield takeLatest(ACTIONS.CLEAR_CACHE_REQUEST, clearCacheSaga);
}
