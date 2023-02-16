import {call, put} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {deleteUserSuccess, deleteUserFailure} from 'core/reducers';

export function* deleteUserSaga() {
  try {
    yield call(amplifyApi.deleteUser);

    yield put(deleteUserSuccess());
  } catch (e) {
    yield put(deleteUserFailure(e as Error));
  }
}
