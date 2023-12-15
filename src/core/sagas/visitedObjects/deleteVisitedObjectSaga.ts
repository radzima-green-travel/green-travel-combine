import {call, put} from 'redux-saga/effects';

import {
  deleteVisitedObjectFailure,
  deleteVisitedObjectRequest,
  deleteVisitedObjectSuccess,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* deleteVisitedObjectSaga({
  payload,
}: ReturnType<typeof deleteVisitedObjectRequest>) {
  try {
    yield call(amplifyApi.deleteUserVisitedObject, payload);

    yield put(deleteVisitedObjectSuccess());
  } catch (e) {
    yield put(deleteVisitedObjectFailure(e as Error));
  }
}
