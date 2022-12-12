import {takeLatest} from 'redux-saga/effects';

import {ACTIONS} from '../../constants';
import {changeAppLanguageSaga} from './changeAppLanguage';

export function* settingsSaga() {
  yield takeLatest(ACTIONS.CHANGE_LANGUAGE_REQUEST, changeAppLanguageSaga);
}
