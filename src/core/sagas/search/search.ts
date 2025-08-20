import {
  getSearchObjectsHistoryRequest,
  getMapSearchObjectsRequest,
  getVisibleOnMapObjectsRequest,
  searchMoreObjectsRequest,
  searchObjectsRequest,
} from 'core/actions';
import {takeEvery, takeLatest} from 'redux-saga/effects';
import {getSearchObjectsHistorySaga} from './getSearchObjectsHistorySaga';
import {searchObjectsSaga} from './searchObjectsSaga';
import {getMapSearchObjectsSaga} from './getMapSearchObjectsSaga';
import {getVisibleOnMapObjectsSaga} from './getVisibleOnMapObjectsSaga';

export function* searchSaga() {
  yield takeEvery(getSearchObjectsHistoryRequest, getSearchObjectsHistorySaga);
  yield takeLatest(searchObjectsRequest, searchObjectsSaga);
  yield takeEvery(searchMoreObjectsRequest, searchObjectsSaga);
  yield takeLatest(getMapSearchObjectsRequest, getMapSearchObjectsSaga);
  yield takeLatest(getVisibleOnMapObjectsRequest, getVisibleOnMapObjectsSaga);
}
