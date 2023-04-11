import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {
  deleteUserSuccess,
  deleteUserFailure,
  clearFavorites,
  inAppBrowserCancelOperation,
  inAppBrowserSuccessOperation,
} from 'core/reducers';

import {selectUserAuthorizedData} from 'core/selectors';

export function* deleteUserSaga() {
  try {
    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );

    const [results] = yield all([
      call(amplifyApi.deleteUser),

      call(function* () {
        if (userData?.identities) {
          const parsedIdentities = JSON.parse(userData.identities);

          if (
            ['Google', 'Facebook', 'SignInWithApple'].includes(
              parsedIdentities?.[0]?.providerName,
            )
          ) {
            yield take([
              inAppBrowserCancelOperation,
              inAppBrowserSuccessOperation,
            ]);
          }
        }
      }),
    ]);

    console.log('results', results);

    yield put(deleteUserSuccess());
    yield put(clearFavorites());
  } catch (e) {
    yield put(deleteUserFailure(e as Error));
  }
}
