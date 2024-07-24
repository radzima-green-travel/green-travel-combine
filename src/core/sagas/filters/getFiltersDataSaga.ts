import {call, all, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest, getRegionsList} from 'core/actions';
import {RequestError} from 'core/errors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
  type,
}) {
  try {
    if (type === getRegionsList.type) {
      const [regionsListItems] = yield all([
        call([graphQLAPI, graphQLAPI.getRegions]),
      ]);

      yield put(
        successAction({
          regionsList: regionsListItems,
        }),
      );
    } else if (type === getFiltersDataRequest.type) {
      const [filtersResult] = yield all([
        call([graphQLAPI, graphQLAPI.getFilterObjects], payload),
      ]);

      yield put(
        successAction({
          total: filtersResult.total,
          items: filtersResult.items,
          googleRatings:
            filtersResult.aggregations.googleRatings.facets.buckets,
          categoriesBuckets:
            filtersResult.aggregations.categories.facets.buckets,
          regionsBuckets: filtersResult.aggregations.regions.facets.buckets,
        }),
      );
    }
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
