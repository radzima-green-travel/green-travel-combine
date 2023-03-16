import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  signOutFailure,
  signOutSuccess,
  inAppBrowserCancelOperation,
  inAppBrowserSuccessOperation,
} from 'core/reducers';
import {selectUserAuthorizedData} from 'core/selectors';

export function* signInOutSaga() {
  try {
    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );

    yield all([
      call(amplifyApi.signOut),

      call(function* () {
        if (userData?.identities) {
          const parsedIdentities = JSON.parse(userData.identities);

          if (
            ['Google', 'Facebook'].includes(parsedIdentities?.[0]?.providerName)
          ) {
            yield take([
              inAppBrowserCancelOperation,
              inAppBrowserSuccessOperation,
            ]);
          }
        }
      }),
    ]);

    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e as Error));
  }
}
