import { takeEvery, takeLatest } from 'redux-saga/effects';
import { syncAndGetBookmarksSaga } from './syncAndGetBookmarksSaga';
import { updateBookmarksSaga } from './updateBookmarksSaga';
import {
  requestUserLocation,
  syncAndGetBookmarksRequest,
  updateBookmarksRequest,
} from 'core/actions';
import { requestUserLocationSaga } from './requestUserLocationSaga';

export function* userSaga() {
  yield takeEvery(syncAndGetBookmarksRequest, syncAndGetBookmarksSaga);
  yield takeLatest(updateBookmarksRequest, updateBookmarksSaga);
  yield takeEvery(requestUserLocation, requestUserLocationSaga);
}
