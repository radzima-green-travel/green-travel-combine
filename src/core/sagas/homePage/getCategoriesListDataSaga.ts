import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getCategoriesListDataRequest} from 'core/actions/home';
import {RequestError} from 'core/errors';
import {selectCategoriesList} from 'selectors';
import {QueryParams} from 'api/graphql/types';

export function* getCategoriesListDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getCategoriesListDataRequest>) {
  try {
    const {nextToken: prevNextToken} = yield select(
      selectCategoriesList(payload),
    );

    const params: QueryParams = {
      limit: 10,
      nextToken: prevNextToken,
      filter: {
        parent: {
          eq: payload,
        },
      },
    };

    const {items, nextToken, total} = yield call(
      [graphQLAPI, graphQLAPI.getCategoriesList],
      params,
    );

    yield put(
      successAction({
        id: payload,
        data: items,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
