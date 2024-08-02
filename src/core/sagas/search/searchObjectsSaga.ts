import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  searchObjectsRequest,
  searchMoreObjectsRequest,
} from 'core/actions/search';
import {selectSearchNextToken} from 'core/selectors/search';
import {RequestError} from 'core/errors';
import type {SearchObjectsResponseDTO} from 'core/types/api';

export function* searchObjectsSaga({
  payload: {query},
  type,
  meta: {successAction, failureAction, reducerId},
}:
  | ReturnType<typeof searchObjectsRequest>
  | ReturnType<typeof searchMoreObjectsRequest>) {
  try {
    const isLoadingMoreAction = type === searchMoreObjectsRequest.type;
    const prevToken: ReturnType<typeof selectSearchNextToken> = yield select(
      selectSearchNextToken,
      reducerId || '',
    );

    if (!query) {
      yield put(successAction({searchObjects: [], nextToken: null, total: 0}));
      return;
    }
    const {items, nextToken, total}: SearchObjectsResponseDTO = yield call(
      [graphQLAPI, graphQLAPI.getSearchObjects],
      {query, nextToken: isLoadingMoreAction ? prevToken : null},
    );

    yield put(successAction({searchObjects: items, nextToken, total}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
