import {call, put} from 'redux-saga/effects';
import {GetVisitedResponse} from 'core/types';
import {
  getVisitedObjectsSuccess,
  getVisitedObjectsFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* getVisitedObjectsSaga() {
  try {
    const {data}: GetVisitedResponse = yield call(
      amplifyApi.getUserVisitedObjects,
    );

    yield put(getVisitedObjectsSuccess(data));
  } catch (e) {
    yield put(getVisitedObjectsFailure(e as Error));
  }
}
