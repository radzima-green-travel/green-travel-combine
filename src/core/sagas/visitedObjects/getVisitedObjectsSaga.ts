import { call, put } from 'redux-saga/effects';
import { GetVisitedObjectsResponse } from 'core/types';
import { getVisitedObjectsRequest } from 'core/actions';

import { amplifyApi } from 'api/amplify';

export function* getVisitedObjectsSaga({
  meta: { successAction, failureAction },
}: ReturnType<typeof getVisitedObjectsRequest>) {
  try {
    const { data }: GetVisitedObjectsResponse = yield call(
      amplifyApi.getUserVisitedObjects,
    );

    yield put(successAction(data));
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
