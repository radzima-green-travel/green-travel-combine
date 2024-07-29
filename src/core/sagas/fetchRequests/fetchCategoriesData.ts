// categoryHelpers.js
import {all, call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getCategoriesWithObjects,
  getObjectByCategories,
} from 'core/transformators/homePage';
import type {
  ListCategoriesResponseDTO,
  CategoriesAggregationsByObjectsResponseDTO,
  ObjectsForCategoriesResponseDTO,
} from 'core/types/api';
import {map} from 'lodash';

export function* fetchCategoriesData() {
  const [{items: categoriesListItems}, aggregations]: [
    ListCategoriesResponseDTO,
    CategoriesAggregationsByObjectsResponseDTO,
  ] = yield all([
    call([graphQLAPI, graphQLAPI.getCategoriesList], {limit: 200}),
    call([graphQLAPI, graphQLAPI.getCategoriesAggregationsByObjects]),
  ]);

  const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
    yield call(getCategoriesWithObjects, aggregations);

  const objectForCategoriesResponse: ObjectsForCategoriesResponseDTO =
    yield call(
      [graphQLAPI, graphQLAPI.getObjectsForCategories],
      map(categoriesWithObjects, 'key'),
    );

  const objectsByCategory: ReturnType<typeof getObjectByCategories> =
    yield call(
      getObjectByCategories,
      categoriesWithObjects,
      objectForCategoriesResponse,
    );

  return {categoriesListItems, objectsByCategory};
}
