import {call, put} from 'redux-saga/effects';

import {addVisitedObjectRequest} from 'core/actions';

import {amplifyApi} from 'api/amplify';

export function* addVisitedObjectSaga({
  payload,
  meta: {successAction, failureAction},
}: ReturnType<typeof addVisitedObjectRequest>) {
  try {
    yield call(amplifyApi.addUserVisitedObject, payload);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
