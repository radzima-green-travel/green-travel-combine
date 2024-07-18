import {call, all, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest} from 'core/actions';
import {RequestError} from 'core/errors';
import {getSpotTranslation} from 'core/helpers';
import {selectAppLanguage} from '../../selectors';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getFiltersDataRequest>) {
  const language = yield select(selectAppLanguage);

  try {
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
        googleRatings: filtersResult.aggregations.googleRatings.facets.buckets,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
