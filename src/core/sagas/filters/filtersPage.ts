import { fetchInitialFilters, getFiltersDataRequest } from 'core/actions';
import { takeLatest } from 'redux-saga/effects';
import { getFiltersDataSaga } from './getFiltersDataSaga';
import { fetchInitialFiltersSaga } from './fetchInitialFiltersSaga';

export function* filtersSaga() {
  yield takeLatest(getFiltersDataRequest, getFiltersDataSaga);
  yield takeLatest(fetchInitialFilters, fetchInitialFiltersSaga);
}
