import {call, put, takeEvery, all} from 'redux-saga/effects';
import {getHomeDataSuccess, getHomeDataFailure} from '../reducers';
import {ACTIONS} from '../constants';
import {getObjects, getCategories} from 'api/native';
import {map, filter} from 'lodash';
import {ICategory, IObject} from '../types';

export function* getHomeDataSaga() {
  try {
    const [categories, objects]: [ICategory[], IObject[]] = yield all([
      call(getCategories),
      call(getObjects),
    ]);

    const data = map(categories, (category) => ({
      ...category,
      objects: map(filter(objects, {category: category._id}), (object) => ({
        ...object,
        cover: 'https://placebear.com/640/360',
      })),
    }));

    yield put(getHomeDataSuccess(data));
  } catch (e) {
    yield put(getHomeDataFailure(e));
  }
}

export function* homeSaga() {
  yield takeEvery(ACTIONS.GET_HOME_DATA_REQUEST, getHomeDataSaga);
}
