import {takeEvery, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {getVisitedObjectsSaga} from './getVisitedObjectsSaga';
import {addVisitedObjectSaga} from './addVisitedObjectSaga';

export function* visitedObjectsSaga() {
  yield takeEvery(ACTIONS.GET_VISITED_OBJECTS_REQUEST, getVisitedObjectsSaga);
  yield takeLatest(ACTIONS.ADD_VISITED_OBJECT_REQUEST, addVisitedObjectSaga);
}
