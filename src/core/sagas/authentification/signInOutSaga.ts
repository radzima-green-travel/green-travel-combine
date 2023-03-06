import {all, call, put, select, take} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';

import {signOutFailure, signOutSuccess} from 'core/reducers';
import {selectUserAuthorizedData} from 'core/selectors';
import {createAuthHubChannel} from './createAuthHubChannel';

import {createSocialLogoutErrorPreset, RequestError} from 'core/errors';

export function* signInOutSaga() {
  try {
    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );
    const channel = createAuthHubChannel();

    yield all([
      call(function* () {
        if (userData?.identities) {
          const parsedIdentities = JSON.parse(userData.identities);
          if (parsedIdentities?.[0]?.providerName === 'Google') {
            yield call(function* () {
              while (true) {
                const data: any = yield take(channel);
                if (data?.payload?.event === 'parsingCallbackUrl') {
                  break;
                } else if (
                  data?.payload?.event === 'signIn_failure' ||
                  data?.payload?.event === 'cognitoHostedUI_failure'
                ) {
                  throw new RequestError(createSocialLogoutErrorPreset());
                }
              }
            });
          }
        }
      }),
      call(amplifyApi.signOut),
    ]);

    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e as Error));
  }
}
