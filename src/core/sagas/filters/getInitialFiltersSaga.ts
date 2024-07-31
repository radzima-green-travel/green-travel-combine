import {
  CategoriesAggregationsByObjectsResponseDTO,
  FiltersCategoriesResponseDTO,
  RegionsListResponseDTO,
  ObjectFiltersDataDTO,
  SettlementsData,
} from 'core/types';
import {all, put, call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';
import {getCategoriesWithObjects} from 'core/transformators/homePage';
import {filter} from 'lodash';
import {getInitialFiltersRequest} from 'core/actions';
import {fetchSettlementsData} from '../fetchRequests';

export function* getInitialFiltersSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getInitialFiltersRequest>) {
  try {
    const [
      filtersCategoriesResponse,
      regionsList,
      aggregations,
      filtersData,
      settlementsData,
    ]: [
      FiltersCategoriesResponseDTO,
      RegionsListResponseDTO,
      CategoriesAggregationsByObjectsResponseDTO,
      ObjectFiltersDataDTO,
      SettlementsData,
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFiltersCategories]),
      call([graphQLAPI, graphQLAPI.getRegions]),
      call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
      call([graphQLAPI, graphQLAPI.getFilterObjects]),
      call(fetchSettlementsData),
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
        settlementsData,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
