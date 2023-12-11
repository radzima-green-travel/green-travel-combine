import {put} from 'redux-saga/effects';
import {clearFavorites, clearVisited} from 'core/reducers';

export function* clearUserDataSaga() {
  yield put(clearFavorites());
  yield put(clearVisited());
}
