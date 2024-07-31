import {
  getFiltersDataRequest,
  getFiltersInitialDataRequest,
} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getFiltersInitialDataSaga} from './getFiltersInitialDataSaga';

export function* filtersSaga() {
  yield takeLeading(getFiltersInitialDataRequest, getFiltersInitialDataSaga);
  yield takeEvery(getFiltersDataRequest, getFiltersDataSaga);
}
