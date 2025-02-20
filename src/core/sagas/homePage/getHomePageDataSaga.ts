import {call, put} from 'redux-saga/effects';
import {CategoryAggregationsByObjectsDTO} from 'core/types';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';
import {getAppMapObjectsRequest} from 'core/actions';
import {getObjectByCategories} from 'core/transformators/homePage';
import type {
  CategoriesResponseDTO,
  ObjectsForCategoriesResponseDTO,
} from 'core/types/api';
import {getCategoriesData} from '../fetchRequests';
import {map} from 'lodash';

export function* getHomePageDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    yield put(getAppMapObjectsRequest());

    const {
      categoriesData: {items},
      categoriesWithObjects,
    }: {
      categoriesData: CategoriesResponseDTO;
      categoriesWithObjects: CategoryAggregationsByObjectsDTO[];
    } = yield call(getCategoriesData, {payload: {limit: 200}});

    const objectForCategoriesResponse: ObjectsForCategoriesResponseDTO =
      yield call([graphQLAPI, graphQLAPI.getObjectsForCategories], {
        categoryIds: map(categoriesWithObjects, 'key'),
      });

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
