import {takeEvery} from 'redux-saga/effects';
import {getObjectDetailsSaga} from './getObjectDetailsSaga';
import {getObjectDetailsRequest} from 'core/actions';

export function* objectDetailsSaga() {
  yield takeEvery(getObjectDetailsRequest, getObjectDetailsSaga);
}
