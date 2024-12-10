import {getFiltersDataRequest} from 'core/actions';
import {takeLatest} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';

export function* filtersSaga() {
  yield takeLatest(getFiltersDataRequest, getFiltersDataSaga);
}
