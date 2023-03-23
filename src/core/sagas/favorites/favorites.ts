import {takeEvery, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {syncAndGetFavoritesSaga} from './syncAndGetFavoritesSaga';
import {updateFavoritesSaga} from './updateFavoritesSaga';

export function* favoritesSaga() {
  yield takeEvery(
    ACTIONS.SYNC_AND_GET_FAVORITES_REQUEST,
    syncAndGetFavoritesSaga,
  );
  yield takeLatest(ACTIONS.UPDATE_FAVORITES_REQUEST, updateFavoritesSaga);

  yield takeEvery(
    [
      ACTIONS.CONFIRM_SIGNUP_SUCCESS,
      ACTIONS.CONFIRM_NEW_PASSWORD_SUCCESS,
      ACTIONS.GOOGLE_SIGNIN_SUCCESS,
      ACTIONS.FACEBOOK_SIGNIN_SUCCESS,
      ACTIONS.SIGNIN_SUCCESS,
    ],
    syncAndGetFavoritesSaga,
  );
}
