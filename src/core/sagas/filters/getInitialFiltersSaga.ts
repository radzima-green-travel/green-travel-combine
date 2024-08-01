import {
  CategoriesAggregationsByObjectsResponseDTO,
  FiltersCategoriesResponseDTO,
  RegionsListResponseDTO,
  ObjectFiltersDataDTO,
} from 'core/types';
import {all, put, call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';
import {getCategoriesWithObjects} from 'core/transformators/homePage';
import {filter} from 'lodash';
import {getInitialFiltersRequest} from 'core/actions';

export function* getInitialFiltersSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getInitialFiltersRequest>) {
  try {
    const [filtersCategoriesResponse, regionsList, aggregations, filtersData]: [
      FiltersCategoriesResponseDTO,
      RegionsListResponseDTO,
      CategoriesAggregationsByObjectsResponseDTO,
      ObjectFiltersDataDTO,
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFiltersCategories]),
      call([graphQLAPI, graphQLAPI.getRegions]),
      call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
      call([graphQLAPI, graphQLAPI.getFilterObjects]),
    ]);

    const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
      yield call(getCategoriesWithObjects, aggregations);

    const categoriesList = filter(filtersCategoriesResponse.items, item =>
      categoriesWithObjects.some(category => category.key === item.id),
    );

    yield put(
      successAction({
        regionsList,
        categoriesList,
        filtersData,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
