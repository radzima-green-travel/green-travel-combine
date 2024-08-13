import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getObjectsListNextDataRequest,
  getObjectsListInitialDataRequest,
  getBookmarksObjectsListRequest,
} from 'core/actions';
import {RequestError} from 'core/errors';
import {selectObjectsList} from 'selectors';
import {ObjectsListQueryParams} from 'api/graphql/types';

export function* getObjectsListDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<
  | typeof getObjectsListInitialDataRequest
  | typeof getObjectsListNextDataRequest
  | typeof getBookmarksObjectsListRequest
>) {
  try {
    const {categoryId, objectsIds} = payload;

    const {nextToken: prevNextToken} = yield select(
      selectObjectsList(categoryId),
    );

    const objectsIdsDefined = !!objectsIds?.length;

    const statusFilter = {
      status: {eq: 'published'},
    };

    const filter = objectsIdsDefined
      ? {id: {match: objectsIds.join(' ')}}
      : {categoryId: {eq: categoryId}};

    const params: ObjectsListQueryParams = {
      sort: {direction: 'asc', field: 'name'},
      nextToken: objectsIdsDefined ? null : prevNextToken,
      limit: objectsIdsDefined ? objectsIds.length : 10,
      filter: {...filter, ...statusFilter},
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
        categoryId,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
