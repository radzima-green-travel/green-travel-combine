import {
  getObjectsListInitialDataRequest,
  getObjectsListNextDataRequest,
} from 'core/actions';
import { takeEvery } from 'redux-saga/effects';
import { getObjectsListDataSaga } from './getObjectsListDataSaga';

export function* objectsListSaga() {
  yield takeEvery(
    [getObjectsListInitialDataRequest, getObjectsListNextDataRequest],
    getObjectsListDataSaga,
  );
}
