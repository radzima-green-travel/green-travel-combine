import { call, put } from 'redux-saga/effects';
import { BookmarksObjectDTO } from 'core/types';
import { RequestError } from 'core/errors';
import { getBookmarksInitialObjectsDataRequest } from 'core/actions/bookmarksDetails';
import { graphQLAPI } from 'api/graphql';
import { createObjectListQueryParams } from 'core/transformators/objectsList';

export function* getBookmarksInitialObjectsDataSaga({
  meta: { failureAction, successAction },
  payload,
}: ReturnType<typeof getBookmarksInitialObjectsDataRequest>) {
  try {
    const params = createObjectListQueryParams({ objectsIds: payload });

    const objects: BookmarksObjectDTO[] = yield call(
      [graphQLAPI, graphQLAPI.getBookmarksInitialObjectsData],
      params,
    );

    yield put(successAction({ objects, objectsIds: payload }));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
