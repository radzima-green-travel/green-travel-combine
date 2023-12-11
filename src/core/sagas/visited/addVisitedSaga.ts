import {call, put, select} from 'redux-saga/effects';

import {
  addVisitedFailure,
  addVisitedRequest,
  addVisitedSuccess,
} from 'core/reducers';

import {selectUserAuthorized} from 'core/selectors';
import {amplifyApi} from 'api/amplify';

export function* addVisitedSaga({
  payload,
}: ReturnType<typeof addVisitedRequest>) {
  try {
    const isAuthorized = yield select(selectUserAuthorized);
    if (isAuthorized) {
      yield call(amplifyApi.addUserVisitedObject, payload);
    }

    yield put(addVisitedSuccess());
  } catch (e) {
    yield put(addVisitedFailure(e as Error));
  }
}
