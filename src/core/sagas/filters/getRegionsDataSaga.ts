import {call, all, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';

export function* getRegionsDataSaga({meta: {failureAction, successAction}}) {
  try {
    const [regionsListItems] = yield all([
      call([graphQLAPI, graphQLAPI.getRegions]),
    ]);

    yield put(successAction(regionsListItems));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
