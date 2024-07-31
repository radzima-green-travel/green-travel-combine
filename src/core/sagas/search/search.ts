import {
  getSearchObjectsHistoryRequest,
  searchMoreObjectsRequest,
  searchObjectsRequest,
} from 'core/actions';
import {takeEvery} from 'redux-saga/effects';
import {getSearchObjectsHistorySaga} from './getSearchObjectsHistorySaga';
import {searchObjectsSaga} from './searchObjectsSaga';

export function* searchSaga() {
  yield takeEvery(getSearchObjectsHistoryRequest, getSearchObjectsHistorySaga);
  yield takeEvery(
    [searchObjectsRequest, searchMoreObjectsRequest],
    searchObjectsSaga,
  );
}
