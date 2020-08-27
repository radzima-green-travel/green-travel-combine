import {all} from 'redux-saga/effects';
import {bootstrapSaga, homeSaga} from './sagas';

export function* rootSaga() {
  try {
    yield all([bootstrapSaga(), homeSaga()]);
  } catch (e) {
    console.log(e);
  }
}
