import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
  getCategoriesListDataRequest,
  getObjectsListDataRequest,
} from 'core/actions/home';
import {takeEvery} from 'redux-saga/effects';
import {getHomePageDataSaga} from './getHomePageDataSaga';
import {getCategoriesListDataSaga} from './getCategoriesListDataSaga';
import {getObjectsListDataSaga} from './getObjectsListDataSaga';

export function* homePageSaga() {
  yield takeEvery(
    [getHomePageDataRequest, refreshHomePageDataRequest],
    getHomePageDataSaga,
  );
  yield takeEvery([getCategoriesListDataRequest], getCategoriesListDataSaga);
  yield takeEvery([getObjectsListDataRequest], getObjectsListDataSaga);
}
