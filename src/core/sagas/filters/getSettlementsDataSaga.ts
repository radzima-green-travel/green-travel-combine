import {call, put, select, all} from 'redux-saga/effects';
import {
  getSettlementsDataRequest,
  getPaginationSettlementsDataRequest,
  getSearchSettlementsDataRequest,
} from 'core/actions';
import {graphQLAPI} from 'api/graphql';
import {selectSettlementsData} from 'selectors';
import {SettlementsQueryParams} from 'api/graphql/types';
import {filter} from 'lodash';
import {RequestError} from 'core/errors';

export function* getSettlementsDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<
  | typeof getSettlementsDataRequest
  | typeof getPaginationSettlementsDataRequest
  | typeof getSearchSettlementsDataRequest
>) {
  try {
    const {nextToken: prevNextToken} = yield select(selectSettlementsData);
    const newToken = payload?.nextToken ?? prevNextToken;

    const params: SettlementsQueryParams = {
      limit: 50,
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

    const [{items, nextToken, total}] = yield all([
      call([graphQLAPI, graphQLAPI.getSettlements], params),
    ]);

    //TODO: Filtering invalid values ​​(Most likely not relevant for prod)
    const filteredData = filter(items, item => /[а-яА-ЯЁё]/.test(item.value));

    yield put(
      successAction({
        data: filteredData,
        requestedItemsCount: items.length,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
