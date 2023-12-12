import {put} from 'redux-saga/effects';
import {clearFavorites, clearVisitedObjects} from 'core/reducers';

export function* clearUserDataSaga() {
  yield put(clearFavorites());
  yield put(clearVisitedObjects());
}
