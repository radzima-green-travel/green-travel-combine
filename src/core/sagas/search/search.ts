import {
  getSearchObjectsHistoryRequest,
  searchMoreObjectsRequest,
  searchObjectsRequest,
} from 'core/actions';
import {takeEvery, takeLatest} from 'redux-saga/effects';
import {getSearchObjectsHistorySaga} from './getSearchObjectsHistorySaga';
import {searchObjectsSaga} from './searchObjectsSaga';

export function* searchSaga() {
  yield takeEvery(getSearchObjectsHistoryRequest, getSearchObjectsHistorySaga);
  yield takeLatest(searchObjectsRequest, searchObjectsSaga);
  yield takeEvery(searchMoreObjectsRequest, searchObjectsSaga);
}
