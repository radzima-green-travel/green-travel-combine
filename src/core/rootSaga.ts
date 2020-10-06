import {all} from 'redux-saga/effects';
import {bootstrapSaga, homeSaga, bookmarksSaga} from './sagas';

export function* rootSaga() {
  yield all([bootstrapSaga(), homeSaga(), bookmarksSaga()]);
}
