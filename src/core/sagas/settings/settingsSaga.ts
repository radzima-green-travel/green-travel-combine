import {takeEvery} from 'redux-saga/effects';

import {ACTIONS} from '../../constants';
import {changeAppLanguageSaga} from './changeAppLanguage';

export function* settingsSaga() {
  yield takeEvery(ACTIONS.CHANGE_LANGUAGE_REQUEST, changeAppLanguageSaga);
}
