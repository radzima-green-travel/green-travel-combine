import {call, put} from 'redux-saga/effects';
import {GetVisitedResponse} from 'core/types';
import {
  getVisitedSuccess,
  getVisitedFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* getVisitedSaga() {
  try {
    const {data}: GetVisitedResponse = yield call(
      amplifyApi.getUserVisitedObjects,
    );

    yield put(getVisitedSuccess(data));
  } catch (e) {
    yield put(getVisitedFailure(e as Error));
  }
}
