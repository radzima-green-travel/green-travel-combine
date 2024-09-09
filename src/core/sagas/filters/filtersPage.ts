import {getFiltersDataRequest, getInitialFiltersRequest} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';

export function* filtersSaga() {
  yield takeLeading(getInitialFiltersRequest, getInitialFiltersSaga);
  yield takeEvery(getFiltersDataRequest, getFiltersDataSaga);
}
