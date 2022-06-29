import {call, put} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {userAuthorizedSuccess, userAuthorizedFailure} from 'core/reducers';

export function* userAuthorizedSaga() {
  try {
    const authUser = yield call([Auth, 'currentAuthenticatedUser'], {
      bypassCache: true,
    });

    yield put(
      userAuthorizedSuccess({
        userAuthorized: authUser,
      }),
    );
  } catch (e) {
    yield put(userAuthorizedFailure(e as Error));
  }
}
