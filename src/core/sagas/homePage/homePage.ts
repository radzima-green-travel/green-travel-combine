import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
  fetchNextRandomObjects,
} from 'core/actions/home';
import {takeEvery} from 'redux-saga/effects';
import {getHomePageDataSaga} from './getHomePageDataSaga';
import {fetchRandomObjects} from './fetchRandomObjects';
import {submitNewPlaceFormRequest} from '../../actions/home';
import {submitNewPlaceFormSaga} from './submitNewPlaceFormSaga';

export function* homePageSaga() {
  yield takeEvery(
    [getHomePageDataRequest, refreshHomePageDataRequest],
    getHomePageDataSaga,
  );
  yield takeEvery(fetchNextRandomObjects, fetchRandomObjects);
  yield takeEvery(submitNewPlaceFormRequest, submitNewPlaceFormSaga);
}
