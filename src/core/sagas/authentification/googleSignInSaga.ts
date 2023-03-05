import {call, put, take, race} from 'redux-saga/effects';
import {
  googleSigninSuccess,
  googleSigninFailure,
  canselSocialSignin,
} from 'core/reducers';
import {createAuthHubChannel} from './createAuthHubChannel';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';
import {
  createSocialLoginCancelErrorPreset,
  RequestError,
  createSocialLoginErrorPreset,
} from 'core/errors';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';

export function* googleSignInSaga() {
  try {
    const channel = createAuthHubChannel();

    yield call(amplifyApi.federatedSignIn, {
      customProvider: CognitoHostedUIIdentityProvider.Google,
    });

    const {user}: {user: CognitoUserWithAttributes} = yield race({
      user: call(function* () {
        while (true) {
          const data: any = yield take(channel);
          if (data?.payload?.event === 'signIn') {
            const response: CognitoUserWithAttributes = yield call(
              amplifyApi.currentAuthenticatedUser,
              {
                bypassCache: true,
              },
            );

            return response;
          } else if (
            data?.payload?.event === 'signIn_failure' ||
            data?.payload?.event === 'cognitoHostedUI_failure'
          ) {
            throw new RequestError(createSocialLoginErrorPreset());
          }
        }
      }),
      cancel: call(function* () {
        yield take(canselSocialSignin);
        throw new RequestError(createSocialLoginCancelErrorPreset());
      }),
    });

    yield put(googleSigninSuccess(user.attributes));
  } catch (e) {
    yield put(googleSigninFailure(e as Error));
  }
}
