import {call, put, select} from 'redux-saga/effects';
import {selectFavoritesData} from 'core/selectors';
import {GetFavoritesResponse} from 'core/types';
import {
  syncAndGetFavoritesSuccess,
  syncAndGetFavoritesFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* syncAndGetFavoritesSaga() {
  try {
    let favorites: ReturnType<typeof selectFavoritesData> = yield select(
      selectFavoritesData,
    );

    yield call(amplifyApi.bulkUpdateUserFavorites, favorites);

    const {data}: GetFavoritesResponse = yield call(
      amplifyApi.getUserFavorites,
    );
    favorites = data;

    yield put(syncAndGetFavoritesSuccess(favorites));
  } catch (e) {
    yield put(syncAndGetFavoritesFailure(e as Error));
  }
}
