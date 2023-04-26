import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  signOutFailure,
  signOutSuccess,
  inAppBrowserCancelOperation,
  inAppBrowserSuccessOperation,
  clearFavorites,
} from 'core/reducers';
import {selectIsAuthorizedWithSocialProviders} from 'core/selectors';

export function* signInOutSaga() {
  try {
    const isAuthorizedWithSocialProviders: ReturnType<
      typeof selectIsAuthorizedWithSocialProviders
    > = yield select(selectIsAuthorizedWithSocialProviders);

    yield all([
      call(amplifyApi.signOut),

      call(function* () {
        if (isAuthorizedWithSocialProviders) {
          yield take([
            inAppBrowserCancelOperation,
            inAppBrowserSuccessOperation,
          ]);
        }
      }),
    ]);

    yield put(signOutSuccess());
    yield put(clearFavorites());
  } catch (e) {
    yield put(signOutFailure(e as Error));
  }
}
