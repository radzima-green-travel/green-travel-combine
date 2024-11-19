import {put} from 'redux-saga/effects';
import {
  getVisitedObjectsRequest,
  syncAndGetBookmarksRequest,
} from 'core/actions';

export function* getObjectAttributesSaga() {
  yield put(syncAndGetBookmarksRequest());

  yield put(getVisitedObjectsRequest());
}
