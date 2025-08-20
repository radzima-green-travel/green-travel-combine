import {call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getVisibleOnMapObjectsRequest} from 'core/actions/search';
import {RequestError} from 'core/errors';
import type {SearchObjectsResponseDTO} from 'core/types/api';
import {getSearchPayloadSaga} from './getSearchPayloadSaga';

export function* getVisibleOnMapObjectsSaga({
  payload: {objectIds},
  meta: {successAction, failureAction},
}: ReturnType<typeof getVisibleOnMapObjectsRequest>) {
  try {
    if (objectIds.length === 0) {
      yield put(successAction([]));
      return;
    }

    const searchPayload = yield call(getSearchPayloadSaga, {
      filters: {objectIds},
    });

    const {items}: SearchObjectsResponseDTO = yield call(
      [graphQLAPI, graphQLAPI.getSearchObjects],
      searchPayload,
    );

    yield put(successAction(items));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
