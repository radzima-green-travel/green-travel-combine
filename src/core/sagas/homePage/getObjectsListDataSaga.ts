import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getObjectsListDataRequest} from 'core/actions/home';
import {RequestError} from 'core/errors';
import {selectObjectsList} from 'selectors';
import {QueryParams} from 'api/graphql/types';

export function* getObjectsListDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getObjectsListDataRequest>) {
  try {
    const {categoryId, objectsIds} = payload;

    const {nextToken: prevNextToken} = yield select(
      selectObjectsList(categoryId),
    );

    const objectsIdsDefined = !!objectsIds?.length;

    const filter = objectsIdsDefined
      ? {id: {match: objectsIds.join(' ')}}
      : {categoryId: {eq: categoryId}};

    const params: QueryParams = {
      sort: {direction: 'asc', field: 'name'},
      nextToken: objectsIdsDefined ? null : prevNextToken,
      limit: objectsIdsDefined ? objectsIds.length : 10,
      filter,
    };

    const {items, nextToken, total} = yield call(
      [graphQLAPI, graphQLAPI.getObjectsList],
      params,
    );

    yield put(
      successAction({
        id: objectsIdsDefined ? objectsIds.join(' ') : categoryId,
        data: items,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
