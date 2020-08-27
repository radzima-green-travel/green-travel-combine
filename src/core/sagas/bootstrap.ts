import {call, put, takeEvery} from 'redux-saga/effects';

import {bootstrapFinish} from '../reducers';
import {getMyCoordinates} from 'services/GeoLocationService';
import {ACTIONS} from 'core/constants';

export function* getMyLocationSaga() {
  try {
    const coordinates = yield call(getMyCoordinates);
    console.log('coordinates', coordinates);
  } catch (e) {
    console.log(e);
  }
}

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_START, function* () {
    // yield call(getMyLocationSaga);
    yield put(bootstrapFinish());
  });
}
