import {call, put, select} from 'redux-saga/effects';
import {GetVisitedObjectsResponse} from 'core/types';
import {
  getVisitedObjectsSuccess,
  getVisitedObjectsFailure,
  addVisitedObjectRequest,
} from 'core/reducers';
import {selectPreparedVisitedObject} from 'core/selectors';

import {amplifyApi} from 'api/amplify';

export function* getVisitedObjectsSaga() {
  try {
    const preparedVisitedObject = yield select(selectPreparedVisitedObject);

    const {data}: GetVisitedObjectsResponse = yield call(
      amplifyApi.getUserVisitedObjects,
    );

    yield put(getVisitedObjectsSuccess(data));

    if (preparedVisitedObject) {
      yield put(addVisitedObjectRequest(preparedVisitedObject));
    }
  } catch (e) {
    yield put(getVisitedObjectsFailure(e as Error));
  }
}
