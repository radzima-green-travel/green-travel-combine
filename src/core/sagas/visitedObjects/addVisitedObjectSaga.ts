import {call, put} from 'redux-saga/effects';

import {
  addVisitedObjectFailure,
  addVisitedObjectRequest,
  addVisitedObjectSuccess,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* addVisitedObjectSaga({
  payload,
}: ReturnType<typeof addVisitedObjectRequest>) {
  try {
    yield call(amplifyApi.addUserVisitedObject, payload);

    yield put(addVisitedObjectSuccess());
  } catch (e) {
    yield put(addVisitedObjectFailure(e as Error));
  }
}
