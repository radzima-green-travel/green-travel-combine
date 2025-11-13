import { call, put } from 'redux-saga/effects';
import { graphQLAPI } from 'api/graphql';
import { getObjectDetailsRequest } from 'core/actions';
import { RequestError } from 'core/errors';
import { ObjectDetailsResponseDTO } from 'core/types';

export function* getObjectDetailsSaga({
  payload,
  meta: { failureAction, successAction },
}: ReturnType<typeof getObjectDetailsRequest>) {
  try {
    const response: ObjectDetailsResponseDTO = yield call(
      [graphQLAPI, graphQLAPI.getObjectDetailsById],
      payload.objectId,
    );

    yield put(successAction({ objectDetails: response }));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
