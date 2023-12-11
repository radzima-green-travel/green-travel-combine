import {takeEvery, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {getVisitedSaga} from './getVisitedSaga';
import {addVisitedSaga} from './addVisitedSaga';

export function* visitedSaga() {
  yield takeEvery(ACTIONS.GET_VISITED_REQUEST, getVisitedSaga);
  yield takeLatest(ACTIONS.ADD_VISITED_REQUEST, addVisitedSaga);
}
