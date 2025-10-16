import {put} from 'redux-saga/effects';
import {clearVisitedObjects, clearBookmarks} from 'core/actions';

export function* clearUserDataSaga() {
  yield put(clearBookmarks());
  yield put(clearVisitedObjects());
}
