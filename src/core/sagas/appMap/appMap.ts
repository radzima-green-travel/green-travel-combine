import {takeLeading} from 'redux-saga/effects';
import {getAppMapObjectsSaga} from './getAppMapObjectsSaga';
import {getAppMapObjectsRequest} from 'core/actions';

export function* appMapSaga() {
  yield takeLeading(getAppMapObjectsRequest, getAppMapObjectsSaga);
}
