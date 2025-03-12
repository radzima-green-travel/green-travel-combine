import {all, call, put} from 'redux-saga/effects';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';
import {getAppMapObjectsRequest} from 'core/actions';
import {getObjectByCategories} from 'core/transformators/homePage';
import {getCategoriesData} from '../fetchRequests';
import {map} from 'lodash';
import {EffectType} from 'core/types/utils';

export function* getHomePageDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    yield put(getAppMapObjectsRequest());

    const [
      {
        categoriesData: {items},
        categoriesWithObjects,
      },
      randomObjects,
      placeOfTheWeek,
    ]: [
      EffectType<typeof getCategoriesData>,
      EffectType<typeof graphQLAPI.getRandomObjectThumbnails>,
      EffectType<typeof graphQLAPI.getPlaceOfTheWeekObject>,
    ] = yield all([
      call(getCategoriesData, {payload: {limit: 200}}),
      call([graphQLAPI, graphQLAPI.getRandomObjectThumbnails], 10),
      call([graphQLAPI, graphQLAPI.getPlaceOfTheWeekObject]),
    ]);

    const objectForCategoriesResponse: EffectType<
      typeof graphQLAPI.getObjectsForCategories
    > = yield call([graphQLAPI, graphQLAPI.getObjectsForCategories], {
      categoryIds: map(categoriesWithObjects, 'key'),
    });

    const objectsByCategory: EffectType<typeof getObjectByCategories> =
      yield call(
        getObjectByCategories,
        categoriesWithObjects,
        objectForCategoriesResponse,
      );

    yield put(
      successAction({
        categoriesList: items,
        objectsByCategory: objectsByCategory,
        randomObjects,
        placeOfTheWeek,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
