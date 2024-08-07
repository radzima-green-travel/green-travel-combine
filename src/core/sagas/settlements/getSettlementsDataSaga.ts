import {SettlementsResponseDTO} from './../../types/api/graphql';
import {call, put, select, all} from 'redux-saga/effects';
import {
  getSettlementsDataRequest,
  getSettlementsNextDataRequest,
} from 'core/actions';
import {graphQLAPI} from 'api/graphql';
import {selectSettlementsData} from 'selectors';
import {SettlementsQueryParams} from 'api/graphql/types';
import {RequestError} from 'core/errors';

export function* getSettlementsDataSaga({
  meta: {failureAction, successAction},
  payload,
  type,
}: ReturnType<
  typeof getSettlementsDataRequest | typeof getSettlementsNextDataRequest
>) {
  try {
    let newToken = '';
    if (type === getSettlementsNextDataRequest.type) {
      const {nextToken: prevNextToken} = yield select(selectSettlementsData);
      newToken = prevNextToken;
    }

    const params: SettlementsQueryParams = {
      limit: 75,
      nextToken: newToken,
      filter: {
        value: {
          matchPhrasePrefix: payload?.searchValue || undefined,
        },
      },
      sort: {
        field: 'value',
        direction: 'asc',
      },
    };

    const [{items, nextToken, total}]: [SettlementsResponseDTO] = yield all([
      call([graphQLAPI, graphQLAPI.getSettlements], params),
    ]);

    yield put(
      successAction({
        data: items,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
