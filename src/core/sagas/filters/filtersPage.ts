import {
  getFiltersDataRequest,
  getInitialFiltersRequest,
  getSettlementsDataRequest,
  getPaginationSettlementsDataRequest,
} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getSettlementsDataSaga} from './getSettlementsDataSaga';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';

export function* filtersSaga() {
  yield takeLeading(getInitialFiltersRequest, getInitialFiltersSaga);
  yield takeEvery(
    [getSettlementsDataRequest, getPaginationSettlementsDataRequest],
    getSettlementsDataSaga,
  );
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
