import { call, put } from 'redux-saga/effects';

import { deleteVisitedObjectRequest } from 'core/actions';

import { amplifyApi } from 'api/amplify';

export function* deleteVisitedObjectSaga({
  payload,
  meta: { successAction, failureAction },
}: ReturnType<typeof deleteVisitedObjectRequest>) {
  try {
    yield call(amplifyApi.deleteUserVisitedObject, payload);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
