import { all, call, put } from 'redux-saga/effects';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions/home';
import { graphQLAPI } from 'api/graphql';
import { RequestError } from 'core/errors';
import { getCategoriesData } from '../fetchRequests';
import { filter } from 'lodash';
import { EffectType } from 'core/types/utils';

export function* getHomePageDataSaga({
  meta: { failureAction, successAction },
}: ReturnType<
  typeof getHomePageDataRequest | typeof refreshHomePageDataRequest
>) {
  try {
    const [
      {
        categoriesData: { items },
        categoriesWithObjects,
      },
      randomObjects,
      placeOfTheWeek,
    ]: [
      EffectType<typeof getCategoriesData>,
      EffectType<typeof graphQLAPI.getRandomObjectThumbnails>,
      EffectType<typeof graphQLAPI.getPlaceOfTheWeekObject>,
    ] = yield all([
      call(getCategoriesData, { payload: { limit: 200 } }),
      call([graphQLAPI, graphQLAPI.getRandomObjectThumbnails], 10),
      call([graphQLAPI, graphQLAPI.getPlaceOfTheWeekObject]),
    ]);
    const categoriesList = filter(items, item => {
      return categoriesWithObjects.some(category => category.key === item.id);
    });
    yield put(
      successAction({
        categoriesList: categoriesList,
        randomObjects,
        placeOfTheWeek,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
