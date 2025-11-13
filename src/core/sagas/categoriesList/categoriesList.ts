import {
  getCategoriesListNextDataRequest,
  getCategoriesListInitialDataRequest,
} from 'core/actions';
import { takeEvery } from 'redux-saga/effects';
import { getCategoriesListDataSaga } from './getCategoriesListDataSaga';

export function* categoriesListSaga() {
  yield takeEvery(
    [getCategoriesListNextDataRequest, getCategoriesListInitialDataRequest],
    getCategoriesListDataSaga,
  );
}
