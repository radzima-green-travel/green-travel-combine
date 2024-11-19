import {call, put} from 'redux-saga/effects';

import {updateVisitedObjectRequest} from 'core/actions';

import {amplifyApi} from 'api/amplify';

export function* updateVisitedObjectSaga({
  payload,
  meta: {successAction, failureAction},
}: ReturnType<typeof updateVisitedObjectRequest>) {
  const {objectId, data} = payload;
  try {
    yield call(amplifyApi.addUserVisitedObject, {
      objectId,
      data: {
        timestamp: data.timestamp,
        spentTime: data.spentTime || null,
        rating: data.rating || null,
      },
    });

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
