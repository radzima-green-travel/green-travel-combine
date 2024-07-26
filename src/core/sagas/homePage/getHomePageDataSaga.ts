import {all, call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {RequestError} from 'core/errors';
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
import {getAppMapObjectsRequest, getRegionsList} from 'core/actions';

export function* getHomePageDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    yield put(getAppMapObjectsRequest());
    yield put(getRegionsList());

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

    yield put(
      successAction({
        categoriesList: categoriesListItems,
        objectsByCategory: objectsByCategory,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
