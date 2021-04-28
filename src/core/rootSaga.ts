import {all} from 'redux-saga/effects';
import {bootstrapSaga, homeSaga, objectDetailsMapSaga} from './sagas';

export function* rootSaga() {
  yield all([bootstrapSaga(), homeSaga(), objectDetailsMapSaga()]);
}
