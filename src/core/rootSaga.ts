import { all } from 'redux-saga/effects';
import {
  authentificationSaga,
  bootstrapSaga,
  objectDetailsMapSaga,
  settingsSaga,
  bookmarksDetails,
  appSaga,
  visitedObjectsSaga,
  analytics,
  homePageSaga,
  filtersSaga,
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
    objectDetailsMapSaga(),
    settingsSaga(),
    bookmarksDetails(),
    appSaga(),
    visitedObjectsSaga(),
    analytics(),
    homePageSaga(),
    filtersSaga(),
    objectsListSaga(),
    categoriesListSaga(),
    searchSaga(),
    settlementsSaga(),
    objectDetailsSaga(),
    userSaga(),
  ]);
}
