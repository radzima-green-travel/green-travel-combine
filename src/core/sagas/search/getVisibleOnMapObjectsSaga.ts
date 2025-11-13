import { graphQLAPI } from 'api/graphql';
import { getVisibleOnMapObjectsRequest } from 'core/actions/search';
import { RequestError } from 'core/errors';
import { createSearchPayloadSaga } from './createSearchPayloadSaga';
import { call, put } from 'core/utils/typed-saga';

export function* getVisibleOnMapObjectsSaga({
  payload: { objectIds },
  meta: { successAction, failureAction },
}: ReturnType<typeof getVisibleOnMapObjectsRequest>) {
  try {
    if (objectIds.length === 0) {
      yield put(successAction([]));
      return;
    }

    const searchPayload = yield* call(createSearchPayloadSaga, {
      filters: { objectIds },
    });

    const { items } = yield* call(
      [graphQLAPI, graphQLAPI.getSearchObjects],
      searchPayload,
    );

    yield put(successAction(items));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
