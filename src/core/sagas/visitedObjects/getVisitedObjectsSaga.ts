import {call, put} from 'redux-saga/effects';
import {GetVisitedObjectsResponse} from 'core/types';
import {
  getVisitedObjectsSuccess,
  getVisitedObjectsFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* getVisitedObjectsSaga() {
  try {
    const {data}: GetVisitedObjectsResponse = yield call(
      amplifyApi.getUserVisitedObjects,
    );

    yield put(getVisitedObjectsSuccess(data));
  } catch (e) {
    yield put(getVisitedObjectsFailure(e as Error));
  }
}
