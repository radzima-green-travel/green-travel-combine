import {takeEvery, takeLatest} from 'redux-saga/effects';
import {syncAndGetBookmarksSaga} from './syncAndGetBookmarksSaga';
import {updateBookmarksSaga} from './updateBookmarksSaga';
import {syncAndGetBookmarksRequest, updateBookmarksRequest} from 'core/actions';

export function* userSaga() {
  yield takeEvery(syncAndGetBookmarksRequest, syncAndGetBookmarksSaga);
  yield takeLatest(updateBookmarksRequest, updateBookmarksSaga);
}
