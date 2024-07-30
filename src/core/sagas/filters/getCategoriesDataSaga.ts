import {CategoryAggregationsByObjectsDTO} from 'core/types';
import {call, put} from 'redux-saga/effects';
import {RequestError} from 'core/errors';
import {graphQLAPI} from 'api/graphql';
import {fetchCategoriesData} from '../fetchRequests/fetchCategoriesData';
import {getFiltersCategories} from 'core/actions';
import {getObjectByCategories} from 'core/transformators/homePage';
import type {
  CategoriesResponseDTO,
  ObjectsForCategoriesResponseDTO,
} from 'core/types/api';
import {map} from 'lodash';

export function* getFiltersCategorieDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getFiltersCategories>) {
  try {
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

    yield put(
      successAction({
        categoriesList: items,
        objectsByCategory: objectsByCategory,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
