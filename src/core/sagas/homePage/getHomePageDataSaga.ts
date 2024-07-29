import {call, put} from 'redux-saga/effects';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {RequestError} from 'core/errors';
import {getAppMapObjectsRequest} from 'core/actions';
import {fetchCategoriesData} from '../fetchRequests/fetchCategoriesData';

export function* getHomePageDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    yield put(getAppMapObjectsRequest());

    const {categoriesListItems, objectsByCategory} =
      yield call(fetchCategoriesData);

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
