import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  deleteUserSuccess,
  deleteUserFailure,
  clearFavorites,
  inAppBrowserCancelOperation,
  inAppBrowserSuccessOperation,
} from 'core/reducers';

import {selectIsAuthorizedWithSocialProviders} from 'core/selectors';

export function* deleteUserSaga() {
  try {
    const isAuthorizedWithSocialProviders: ReturnType<
      typeof selectIsAuthorizedWithSocialProviders
    > = yield select(selectIsAuthorizedWithSocialProviders);

    yield all([
      call(amplifyApi.deleteUser),

      call(function* () {
        if (isAuthorizedWithSocialProviders) {
          yield take([
            inAppBrowserCancelOperation,
            inAppBrowserSuccessOperation,
          ]);
        }
      }),
    ]);

    yield put(deleteUserSuccess());
    yield put(clearFavorites());
  } catch (e) {
    yield put(deleteUserFailure(e as Error));
  }
}
