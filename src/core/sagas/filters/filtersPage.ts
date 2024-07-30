import {getFiltersDataRequest, getInitialFilters} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';

import {getInitialFiltersSaga} from './getInitialFiltersSaga';

export function* filtersSaga() {
  yield takeLeading([getInitialFilters], getInitialFiltersSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
