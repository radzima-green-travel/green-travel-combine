import {
  getFiltersDataRequest,
  getRegionsList,
  getFiltersCategories,
  getSettlementsDataRequest,
  getSettlementsInitialDataRequest,
} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getRegionsDataSaga} from './getRegionsDataSaga';
import {getFiltersCategorieDataSaga} from './getCategoriesDataSaga';
import {getSettlementsDataSaga} from './getSettlementsDataSaga';

export function* filtersSaga() {
  yield takeLeading(
    [getSettlementsDataRequest, getSettlementsInitialDataRequest],
    getSettlementsDataSaga,
  );
  yield takeLeading([getRegionsList], getRegionsDataSaga);
  yield takeLeading([getFiltersCategories], getFiltersCategorieDataSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
