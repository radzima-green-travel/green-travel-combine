import {call, put} from 'redux-saga/effects';
import {facebookSigninSuccess, facebookSigninFailure} from 'core/reducers';
import {createAuthHubChannel} from './createAuthHubChannel';
import {CognitoUserWithAttributes} from 'core/types';

import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {socialSignInSaga} from './socialSignInSaga';

export function* facebookSignInSaga() {
  const channel = createAuthHubChannel();

  try {
    const user: CognitoUserWithAttributes = yield call(socialSignInSaga, {
      provider: CognitoHostedUIIdentityProvider.Facebook,
      authChannel: channel,
    });

    yield put(facebookSigninSuccess(user.attributes));
  } catch (e) {
    yield put(facebookSigninFailure(e as Error));
  } finally {
    channel.close();
  }
}
