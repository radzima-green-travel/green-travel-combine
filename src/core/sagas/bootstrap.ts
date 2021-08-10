import {put, takeEvery} from 'redux-saga/effects';

import {bootstrapFinish} from '../reducers';
import {ACTIONS} from 'core/constants';

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_START, function* () {
    yield put(bootstrapFinish());
  });
}
