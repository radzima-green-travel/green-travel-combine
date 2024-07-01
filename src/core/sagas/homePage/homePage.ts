import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {takeEvery} from 'redux-saga/effects';
import {getHomePageDataSaga} from './getHomePageDataSaga';

export function* homePageSaga() {
  yield takeEvery(
    [getHomePageDataRequest, refreshHomePageDataRequest],
    getHomePageDataSaga,
  );
}
