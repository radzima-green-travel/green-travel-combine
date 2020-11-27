import {all} from 'redux-saga/effects';
import {bootstrapSaga, homeSaga} from './sagas';

export function* rootSaga() {
  yield all([bootstrapSaga(), homeSaga()]);
}
