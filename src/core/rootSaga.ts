import {all} from 'redux-saga/effects';
import {
  authentificationSaga,
  bootstrapSaga,
  homeSaga,
  objectDetailsMapSaga,
  settingsSaga,
  favoritesSaga,
  appSaga,
  visitedObjectsSaga,
  analytics,
  homePageSaga,
} from './sagas';

export function* rootSaga() {
  yield all([
    authentificationSaga(),
    bootstrapSaga(),
    homeSaga(),
    objectDetailsMapSaga(),
    settingsSaga(),
    favoritesSaga(),
    appSaga(),
    visitedObjectsSaga(),
    analytics(),
    homePageSaga(),
  ]);
}
