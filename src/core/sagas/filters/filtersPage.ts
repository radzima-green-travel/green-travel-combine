import {
  getFiltersDataRequest,
  getInitialFiltersRequest,
  getSettlementsDataRequest,
} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getSettlementsDataSaga} from './getSettlementsDataSaga';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';

export function* filtersSaga() {
  yield takeLeading(getInitialFiltersRequest, getInitialFiltersSaga);
  yield takeLeading(getSettlementsDataRequest, getSettlementsDataSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
