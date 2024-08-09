import {call, put} from 'redux-saga/effects';
import {getVisitedObjectsSaga} from '../visitedObjects/getVisitedObjectsSaga';
import {syncAndGetBookmarksRequest} from 'core/actions';

export function* getObjectAttributesSaga() {
  yield put(syncAndGetBookmarksRequest());

  yield call(getVisitedObjectsSaga);
}
