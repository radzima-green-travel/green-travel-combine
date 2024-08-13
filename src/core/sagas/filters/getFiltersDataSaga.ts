import {call, delay, put} from 'redux-saga/effects';
import {ObjectFiltersDataDTO} from 'core/types';
import {RequestError} from 'core/errors';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest} from 'core/actions';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const filtersResult: ObjectFiltersDataDTO = yield call(
      [graphQLAPI, graphQLAPI.getFilterObjects],
      payload,
    );

    yield delay(1000);

    yield put(successAction(filtersResult));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
