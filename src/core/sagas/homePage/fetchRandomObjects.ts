import { graphQLAPI } from 'api/graphql';
import { fetchNextRandomObjects } from 'core/actions';
import { RequestError } from 'core/errors';
import { call, put } from 'redux-saga/effects';

export function* fetchRandomObjects({
  meta: { failureAction, successAction },
}: ReturnType<typeof fetchNextRandomObjects>) {
  try {
    const objects = yield call(
      [graphQLAPI, graphQLAPI.getRandomObjectThumbnails],
      10,
    );

    yield put(successAction(objects));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
