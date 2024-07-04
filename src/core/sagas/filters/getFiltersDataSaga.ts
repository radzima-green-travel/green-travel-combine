import {all, call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest, refreshFiltersDataRequest} from 'core/actions';
import {RequestError} from 'core/errors';

import type {RegionsList} from 'core/types/api';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getFiltersDataRequest | typeof refreshFiltersDataRequest
>) {
  console.log('test');
  try {
    const [{items: regionsListItems}]: [{items: RegionsList}] = yield all([
      call([graphQLAPI, graphQLAPI.getRegions]),
    ]);

    yield put(
      successAction({
        regionsList: regionsListItems,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
