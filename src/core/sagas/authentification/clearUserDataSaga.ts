import {put} from 'redux-saga/effects';
import {clearVisitedObjects} from 'core/actions';
import {clearBookmarks} from 'core/actions';

export function* clearUserDataSaga() {
  yield put(clearBookmarks());
  yield put(clearVisitedObjects());
}
