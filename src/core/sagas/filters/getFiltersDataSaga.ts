import {call, all, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getFiltersDataRequest,
  getFiltersDataRequestDuringFirstLoad,
} from 'core/actions';
import {RequestError} from 'core/errors';
import {getSpotTranslation} from 'core/helpers';
import {selectAppLanguage} from '../../selectors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
  type,
}) {
  const language = yield select(selectAppLanguage);

  try {
    if (type === getFiltersDataRequestDuringFirstLoad.type) {
      const [regionsListItems, filtersResult] = yield all([
        call([graphQLAPI, graphQLAPI.getRegions]),
        call([graphQLAPI, graphQLAPI.getFilterObjects], payload),
      ]);

      yield put(
        successAction({
          regionsList: regionsListItems.map(item => {
            return {
              id: item.id,
              value: getSpotTranslation(item, language),
            };
          }),
          total: filtersResult.total,
          items: filtersResult.items,
          googleRatings:
            filtersResult.aggregations.googleRatings.facets.buckets,
          categoriesBuckets:
            filtersResult.aggregations.categories.facets.buckets,
          regionsBuckets: filtersResult.aggregations.regions.facets.buckets,
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
