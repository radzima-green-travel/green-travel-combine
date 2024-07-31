import {
  CategoriesAggregationsByObjectsResponseDTO,
  FiltersCategoriesResponseDTO,
  RegionsListResponseDTO,
} from 'core/types';
import {all, put, call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';
import {getCategoriesWithObjects} from 'core/transformators/homePage';
import {filter} from 'lodash';
import {getFiltersInitialDataRequest} from 'core/actions';

export function* getFiltersInitialDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getFiltersInitialDataRequest>) {
  try {
    const [filtersCategoriesResponse, regionsList, aggregations]: [
      FiltersCategoriesResponseDTO,
      RegionsListResponseDTO,
      CategoriesAggregationsByObjectsResponseDTO,
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFiltersCategories]),
      call([graphQLAPI, graphQLAPI.getRegions]),
      call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
    ]);

    const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
      yield call(getCategoriesWithObjects, aggregations);

    const categoriesList = filter(filtersCategoriesResponse.items, item =>
      categoriesWithObjects.some(category => category.key === item.id),
    );

    yield put(successAction({regionsList, categoriesList}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
