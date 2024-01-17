import {call, put} from 'redux-saga/effects';

import {
  updateVisitedObjectRequest,
  updateVisitedObjectSuccess,
  updateVisitedObjectFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* updateVisitedObjectSaga({
  payload,
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

    yield put(updateVisitedObjectSuccess());
  } catch (e) {
    yield put(updateVisitedObjectFailure(e as Error));
  }
}
