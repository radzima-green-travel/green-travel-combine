import {call, put} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  deleteUserSuccess,
  deleteUserFailure,
  clearFavorites,
} from 'core/reducers';

export function* deleteUserSaga() {
  try {
    yield call(amplifyApi.deleteUser);

    yield put(deleteUserSuccess());
    yield put(clearFavorites());
  } catch (e) {
    yield put(deleteUserFailure(e as Error));
  }
}
