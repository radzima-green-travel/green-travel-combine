import {call, all, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}) {
  try {
    const [filtersResult] = yield all([
      call([graphQLAPI, graphQLAPI.getFilterObjects], payload),
    ]);

    yield put(successAction(filtersResult));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
