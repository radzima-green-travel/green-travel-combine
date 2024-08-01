import {all, call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getCategoriesWithObjects} from 'core/transformators/homePage';
import type {
  CategoriesResponseDTO,
  CategoriesAggregationsByObjectsResponseDTO,
} from 'core/types/api';
import {CategoriesListQueryParams} from 'api/graphql/types';

interface getCategoriesDataReturn {
  categoriesData: CategoriesResponseDTO;
  categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects>;
}

export function* getCategoriesData({
  payload,
}: {
  payload: CategoriesListQueryParams;
}): Generator<any, getCategoriesDataReturn, any> {
  const [categoriesData, aggregations]: [
    CategoriesResponseDTO,
    CategoriesAggregationsByObjectsResponseDTO,
  ] = yield all([
    call([graphQLAPI, graphQLAPI.getCategoriesList], payload),
    call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
  ]);

  const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
    yield call(getCategoriesWithObjects, aggregations);

  return {categoriesData, categoriesWithObjects};
}
