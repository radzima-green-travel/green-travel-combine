import {call, take, race} from 'redux-saga/effects';
import {inAppBrowserCancelOperation} from 'core/reducers';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';
import {
  createSocialLoginCancelErrorPreset,
  RequestError,
  createSocialLoginErrorPreset,
} from 'core/errors';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {EventChannel} from 'redux-saga';

export function* socialSignInSaga({
  provider,
  authChannel,
}: {
  provider: CognitoHostedUIIdentityProvider;
  authChannel: EventChannel<unknown>;
}) {
  yield call(amplifyApi.federatedSignIn, {
    customProvider: provider,
  });

  const {user}: {user: CognitoUserWithAttributes} = yield race({
    user: call(function* () {
      while (true) {
        const data: any = yield take(authChannel);
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
      yield take(inAppBrowserCancelOperation);
      throw new RequestError(createSocialLoginCancelErrorPreset());
    }),
  });
  return user;
}
