import {all} from 'redux-saga/effects';
import {
  authentificationSaga,
  bootstrapSaga,
  homeSaga,
  objectDetailsMapSaga,
  settingsSaga,
  bookmarksDetails,
  appSaga,
  visitedObjectsSaga,
  analytics,
  homePageSaga,
  filtersSaga,
  appMapSaga,
  objectsListSaga,
  categoriesListSaga,
  searchSaga,
  settlementsSaga,
  objectDetailsSaga,
  userSaga,
} from './sagas';

export function* rootSaga() {
  yield all([
    authentificationSaga(),
    bootstrapSaga(),
    homeSaga(),
    objectDetailsMapSaga(),
    settingsSaga(),
    bookmarksDetails(),
    appSaga(),
    visitedObjectsSaga(),
    analytics(),
    homePageSaga(),
    filtersSaga(),
    appMapSaga(),
    objectsListSaga(),
    categoriesListSaga(),
    searchSaga(),
    settlementsSaga(),
    objectDetailsSaga(),
    userSaga(),
  ]);
}
