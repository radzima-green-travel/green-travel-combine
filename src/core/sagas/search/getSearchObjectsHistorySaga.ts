import { call, put, select } from 'redux-saga/effects';
import { graphQLAPI } from 'api/graphql';
import { getSearchObjectsHistoryRequest } from 'core/actions/searchHistory';
import { RequestError } from 'core/errors';
import type { SearchObjectsHistoryResponseDTO } from 'core/types/api';
import { selectSearchHistoryObjectsIds } from 'core/selectors';

export function* getSearchObjectsHistorySaga({
  meta: { successAction, failureAction },
}: ReturnType<typeof getSearchObjectsHistoryRequest>) {
  try {
    const objectsIds = yield select(selectSearchHistoryObjectsIds);

    const { items }: SearchObjectsHistoryResponseDTO = yield call(
      [graphQLAPI, graphQLAPI.getSearchObjectsHistory],
      { objectsIds },
    );

    yield put(successAction({ searchHistoryObjects: items }));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
