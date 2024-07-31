import {all, call, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import type {SettlementsData} from 'core/types';
import {selectSettlementsData} from 'selectors';
import {SettlementsQueryParams} from 'api/graphql/types';
import {filter} from 'lodash';

export function* fetchSettlementsData(): Generator<any, SettlementsData, any> {
  const {nextToken: prevNextToken} = yield select(selectSettlementsData);

  const params: SettlementsQueryParams = {
    limit: 50,
    nextToken: prevNextToken,
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

  return {
    data: filteredData,
    requestedItemsCount: items.length,
    nextToken,
    total,
  };
}
