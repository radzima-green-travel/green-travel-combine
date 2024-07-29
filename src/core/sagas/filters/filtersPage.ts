import {
  getFiltersDataRequest,
  getRegionsList,
  getFiltersCategories,
} from 'core/actions';
import {takeEvery, takeLeading} from 'redux-saga/effects';
import {getFiltersDataSaga} from './getFiltersDataSaga';
import {getRegionsDataSaga} from './getRegionsDataSaga';
import {getFiltersCategorieDataSaga} from './getCategoriesDataSaga';

export function* filtersSaga() {
  yield takeLeading([getRegionsList], getRegionsDataSaga);
  yield takeLeading([getFiltersCategories], getFiltersCategorieDataSaga);
  yield takeEvery([getFiltersDataRequest], getFiltersDataSaga);
}
