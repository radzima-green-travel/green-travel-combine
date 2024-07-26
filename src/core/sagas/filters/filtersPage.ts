import {getFiltersDataRequest, getRegionsList} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getRegionsDataSaga} from './getRegionsDataSaga';

export function* filtersSaga() {
  yield takeLeading([getRegionsList], getRegionsDataSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
