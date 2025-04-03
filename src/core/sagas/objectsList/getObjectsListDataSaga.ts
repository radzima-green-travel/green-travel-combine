import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getObjectsListNextDataRequest,
  getObjectsListInitialDataRequest,
  getBookmarksObjectsListRequest,
} from 'core/actions';
import {RequestError} from 'core/errors';
import {selectObjectsList} from 'selectors';
import {createObjectListQueryParams} from 'core/transformators/objectsList';

export function* getObjectsListDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<
  | typeof getObjectsListInitialDataRequest
  | typeof getObjectsListNextDataRequest
  | typeof getBookmarksObjectsListRequest
>) {
  try {
    const {listId, ...appliedFilters} = payload;

    const {nextToken: prevNextToken} = yield select(selectObjectsList(listId));

    const params = createObjectListQueryParams(appliedFilters, prevNextToken);

    const {items, nextToken, total} = yield call(
      [graphQLAPI, graphQLAPI.getObjectsList],
      params,
    );

    yield put(
      successAction({
        id: listId,
        data: items,
        nextToken,
        total,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
