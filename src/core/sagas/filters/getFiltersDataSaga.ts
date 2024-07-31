import {call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {ObjectFiltersDataDTO} from 'core/types';
import {RequestError} from 'core/errors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}) {
  try {
    const filtersResult: ObjectFiltersDataDTO = yield call(
      [graphQLAPI, graphQLAPI.getFilterObjects],
      payload,
    );

    yield put(successAction(filtersResult));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
