import {call, put, select} from 'redux-saga/effects';

import {
  updateFavoritesRequest,
  updateFavoritesSuccess,
  updateFavoritesFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';
import {selectUserAuthorized} from 'core/selectors';

export function* updateFavoritesSaga({
  payload,
}: ReturnType<typeof updateFavoritesRequest>) {
  try {
    const isAuthorized = yield select(selectUserAuthorized);
    if (isAuthorized) {
      yield call(amplifyApi.updateUserFavorites, payload);
    }
    yield put(updateFavoritesSuccess());
  } catch (e) {
    yield put(updateFavoritesFailure(e as Error));
  }
}
