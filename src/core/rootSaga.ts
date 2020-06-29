import {all} from 'redux-saga/effects';

export function* rootSaga() {
  try {
    yield all([]);
  } catch (e) {
    console.log(e);
  }
}
