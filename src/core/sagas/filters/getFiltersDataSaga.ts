import {call, all, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest} from 'core/actions';
import {RequestError} from 'core/errors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const [regionsListItems, filtersResult] = yield all([
      call([graphQLAPI, graphQLAPI.getRegions]),
      call([graphQLAPI, graphQLAPI.getFilterObjects], payload),
    ]);

    yield put(
      successAction({
        regionsList: regionsListItems,
        total: filtersResult.total,
        items: filtersResult.items,
        googleRatings: filtersResult.aggregations.googleRatings.facets.buckets,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
