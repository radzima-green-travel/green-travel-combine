import {call, put} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';

import {deleteUserSuccess, deleteUserFailure} from 'core/reducers';

export function* deleteUserSaga() {
  try {
    yield call([Auth, Auth.deleteUser]);

    yield put(deleteUserSuccess());
  } catch (e) {
    yield put(deleteUserFailure(e as Error));
  }
}
