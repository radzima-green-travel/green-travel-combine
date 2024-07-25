import {all, call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getCategoriesListInitialDataRequest,
  getCategoriesListNextDataRequest,
} from 'core/actions';
import {RequestError} from 'core/errors';
import {selectCategoriesList} from 'selectors';
import {CategoriesListQueryParams} from 'api/graphql/types';
import {getCategoriesWithObjects} from 'core/transformators/homePage';
import {filter} from 'lodash';

export function* getCategoriesListDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<
  | typeof getCategoriesListInitialDataRequest
  | typeof getCategoriesListNextDataRequest
>) {
  try {
    const {nextToken: prevNextToken} = yield select(
      selectCategoriesList(payload),
    );

    const params: CategoriesListQueryParams = {
      limit: 10,
      nextToken: prevNextToken,
      filter: {
        parent: {
          eq: payload,
        },
      },
    };

    const [{items, nextToken, total}, aggregations] = yield all([
      call([graphQLAPI, graphQLAPI.getCategoriesList], params),
      call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
    ]);

    const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
      yield call(getCategoriesWithObjects, aggregations);

    const filteredData = filter(items, item =>
      categoriesWithObjects.some(category => category.key === item.id),
    );

    yield put(
      successAction({
        id: payload,
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
