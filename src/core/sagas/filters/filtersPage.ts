import {getFiltersDataRequest, getRegionsList} from 'core/actions';
import {takeEvery} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getRegionsDataSaga} from './getRegionsDataSaga';

export function* filtersSaga() {
  yield takeEvery([getRegionsList], getRegionsDataSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
