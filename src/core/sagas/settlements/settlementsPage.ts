import {
  getSettlementsDataRequest,
  getSettlementsNextDataRequest,
} from 'core/actions';
import {takeEvery} from 'redux-saga/effects';
import {getSettlementsDataSaga} from './getSettlementsDataSaga';

export function* settlementsSaga() {
  yield takeEvery(
    [getSettlementsDataRequest, getSettlementsNextDataRequest],
    getSettlementsDataSaga,
  );
}
