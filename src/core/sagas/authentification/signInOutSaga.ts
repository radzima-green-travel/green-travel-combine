import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  signOutRequest,
  inAppBrowserCancelOperation,
  inAppBrowserSuccessOperation,
  clearUserData,
} from 'core/actions';
import {selectIsAuthorizedWithSocialProviders} from 'core/selectors';

export function* signInOutSaga({
  meta: {successAction, failureAction},
}: ReturnType<typeof signOutRequest>) {
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

    yield put(successAction());
    yield put(clearUserData());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
