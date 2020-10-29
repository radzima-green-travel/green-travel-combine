import {call, put, takeEvery} from 'redux-saga/effects';
import {getHomeDataSuccess, getHomeDataFailure} from '../reducers';
import {ACTIONS} from '../constants';
import {getCategories} from 'api/native';
import {ICategoryWithObjects} from '../types';

export function* getHomeDataSaga() {
  try {
    const categories: ICategoryWithObjects[] = yield call(getCategories);

    yield put(getHomeDataSuccess(categories));
  } catch (e) {
    yield put(getHomeDataFailure(e));
  }
}

export function* homeSaga() {
  yield takeEvery(ACTIONS.GET_HOME_DATA_REQUEST, getHomeDataSaga);
}
