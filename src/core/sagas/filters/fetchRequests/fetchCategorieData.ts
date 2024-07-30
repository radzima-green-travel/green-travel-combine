import {CategoryAggregationsByObjectsDTO} from 'core/types';
import {call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {fetchCategoriesData} from '../../fetchRequests/fetchCategoriesData';
import {getObjectByCategories} from 'core/transformators/homePage';
import type {
  CategoriesResponseDTO,
  ObjectsForCategoriesResponseDTO,
} from 'core/types/api';
import {map} from 'lodash';

export function* fetchCategorieData() {
  const {
    categoriesData: {items},
    categoriesWithObjects,
  }: {
    categoriesData: CategoriesResponseDTO;
    categoriesWithObjects: CategoryAggregationsByObjectsDTO[];
  } = yield call(fetchCategoriesData, {payload: {limit: 200}});

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

  return {
    categoriesList: items,
    objectsByCategory: objectsByCategory,
  };
}
