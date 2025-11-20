import { call, delay, put, select } from 'redux-saga/effects';
import { graphQLAPI } from 'api/graphql';
import {
  searchObjectsRequest,
  searchMoreObjectsRequest,
} from 'core/actions/search';
import { selectSearchNextToken } from 'core/selectors/search';
import { RequestError } from 'core/errors';
import type { SearchObjectsResponseDTO } from 'core/types/api';
import { createSearchPayloadSaga } from './createSearchPayloadSaga';

export function* searchObjectsSaga({
  payload: { query, filters, options },
  type,
  meta: { successAction, failureAction, reducerId },
}:
  | ReturnType<typeof searchObjectsRequest>
  | ReturnType<typeof searchMoreObjectsRequest>) {
  try {
    const isLoadingMoreAction = type === searchMoreObjectsRequest.type;
    const prevToken: ReturnType<typeof selectSearchNextToken> = yield select(
      selectSearchNextToken,
      reducerId || '',
    );

    if (!isLoadingMoreAction) {
      yield delay(300);
    }

    const searchPayload = yield call(createSearchPayloadSaga, {
      query,
      filters,
      options,
    });

    const { items, nextToken, total, highlight }: SearchObjectsResponseDTO =
      yield call([graphQLAPI, graphQLAPI.getSearchObjects], {
        ...searchPayload,
        nextToken: isLoadingMoreAction ? prevToken : null,
      });

    yield put(
      successAction({ searchObjects: items, nextToken, total, highlight }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
