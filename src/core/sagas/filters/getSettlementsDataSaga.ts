import {all, call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getSettlementsDataRequest} from 'core/actions';
import {RequestError} from 'core/errors';
import {SettlementsQueryParams} from 'api/graphql/types';

export function* getSettlementsDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getSettlementsDataRequest>) {
  try {
    const prevNextToken = payload;

    const params: SettlementsQueryParams = {
      limit: 25,
      nextToken: prevNextToken,
    };

    const [{items, nextToken, total}] = yield all([
      call([graphQLAPI, graphQLAPI.getSettlements], params),
    ]);

    yield put(
      successAction({
        data: items,
        requestedItemsCount: items.length,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
