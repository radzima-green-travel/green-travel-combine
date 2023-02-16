import {call, put} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {signOutFailure, signOutSuccess} from 'core/reducers';

export function* signInOutSaga() {
  try {
    yield call(amplifyApi.signOut);

    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e as Error));
  }
}
