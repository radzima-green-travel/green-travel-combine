import {getFiltersDataRequest, refreshFiltersDataRequest} from 'core/actions';
import {takeEvery} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';

export function* filtersSaga() {
  yield takeEvery(
    [getFiltersDataRequest, refreshFiltersDataRequest],
    getFiltersDataSaga,
  );
}
