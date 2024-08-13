import {takeEvery} from 'redux-saga/effects';
import {getBookmarksObjectsListSaga} from './getBookmarksObjectsListSaga';
import {getBookmarksInitialObjectsDataSaga} from './getBookmarksInitialObjectsDataSaga';
import {
  getBookmarksInitialObjectsDataRequest,
  getBookmarksObjectsListRequest,
} from 'core/actions/bookmarksDetails';

export function* bookmarksDetails() {
  yield takeEvery(getBookmarksObjectsListRequest, getBookmarksObjectsListSaga);
  yield takeEvery(
    getBookmarksInitialObjectsDataRequest,
    getBookmarksInitialObjectsDataSaga,
  );
}
