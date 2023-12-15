import {takeEvery, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {getVisitedObjectsSaga} from './getVisitedObjectsSaga';
import {addVisitedObjectSaga} from './addVisitedObjectSaga';
import {deleteVisitedObjectSaga} from './deleteVisitedObjectSaga';

export function* visitedObjectsSaga() {
  yield takeEvery(ACTIONS.GET_VISITED_OBJECTS_REQUEST, getVisitedObjectsSaga);
  yield takeLatest(ACTIONS.ADD_VISITED_OBJECT_REQUEST, addVisitedObjectSaga);
  yield takeLatest(
    ACTIONS.DELETE_VISITED_OBJECT_REQUEST,
    deleteVisitedObjectSaga,
  );
}
