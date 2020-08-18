import {all} from 'redux-saga/effects';
import {bootstrapSaga} from './sagas';
export function* rootSaga() {
  try {
    yield all([bootstrapSaga()]);
  } catch (e) {
    console.log(e);
  }
}
