import {all} from 'redux-saga/effects';
import {
  authentificationSaga,
  bootstrapSaga,
  homeSaga,
  objectDetailsMapSaga,
  settingsSaga,
} from './sagas';

export function* rootSaga() {
  yield all([
    authentificationSaga(),
    bootstrapSaga(),
    homeSaga(),
    objectDetailsMapSaga(),
    settingsSaga(),
  ]);
}
