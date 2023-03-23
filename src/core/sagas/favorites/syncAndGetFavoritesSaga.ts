import {call, put, select} from 'redux-saga/effects';
import {
  selectFavoritesData,
  selectLegacyBookmarksIds,
  selectUserAuthorized,
} from 'core/selectors';
import {GetFavoritesResponse} from 'core/types';
import {
  syncAndGetFavoritesSuccess,
  syncAndGetFavoritesFailure,
  cleareLegacyBookmarksIds,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';
import {reduce} from 'lodash';

export function* syncAndGetFavoritesSaga() {
  try {
    const isAuthorized = yield select(selectUserAuthorized);
    let favorites: ReturnType<typeof selectFavoritesData> = yield select(
      selectFavoritesData,
    );
    const legacyBookmarksIds: string[] = yield select(selectLegacyBookmarksIds);
    if (legacyBookmarksIds.length > 0) {
      favorites = reduce(
        legacyBookmarksIds,
        (acc, id) => {
          if (!acc[id]) {
            acc[id] = [true, Date.now()];
          }

          return acc;
        },
        favorites,
      );
      yield put(cleareLegacyBookmarksIds());
    }

    if (isAuthorized) {
      yield call(amplifyApi.bulkUpdateUserFavorites, favorites);

      const {data}: GetFavoritesResponse = yield call(
        amplifyApi.getUserFavorites,
      );
      favorites = data;
    }

    yield put(syncAndGetFavoritesSuccess(favorites));
  } catch (e) {
    yield put(syncAndGetFavoritesFailure(e as Error));
  }
}
