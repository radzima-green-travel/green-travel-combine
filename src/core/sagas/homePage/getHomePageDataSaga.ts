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
  ListShortObjectsResponseDTO,
} from 'core/types/api';
import {map} from 'lodash';

export function* getHomePageDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    const {items: categoriesListItems}: ListCategoriesResponseDTO = yield call([
      graphQLAPI,
      graphQLAPI.getListCategories,
    ]);

    const categoriesWithObjects: ReturnType<typeof getCategoriesWithObjects> =
      yield call(getCategoriesWithObjects, categoriesListItems);

    const objectsResponseCollection: Array<ListShortObjectsResponseDTO> =
      yield all(
        map(categoriesWithObjects, category => {
          return call([graphQLAPI, graphQLAPI.getShortObjectList], {
            categoryId: category.id,
          });
        }),
      );

    const objectsByCategory: ReturnType<typeof getObjectByCategories> =
      yield call(
        getObjectByCategories,
        categoriesWithObjects,
        objectsResponseCollection,
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
