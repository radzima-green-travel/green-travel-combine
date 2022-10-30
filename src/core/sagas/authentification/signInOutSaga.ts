import {call, put} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';

import {signOutFailure, signOutSuccess} from 'core/reducers';

export function* signInOutSaga() {
  try {
    yield call([Auth, Auth.signOut]);

    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e as Error));
  }
}
