import {Auth} from 'aws-amplify';
import {call} from 'redux-saga/effects';

export function* checkIfUserExistSaga(email: string) {
  try {
    yield call([Auth, Auth.signIn], email, '000');
  } catch (e) {
    console.log('error', e);

    if (e?.code === 'PasswordResetRequiredException') {
      return {
        exist: true,
        isConfirmed: false,
        isPasswordReset: true,
      };
    }

    if (e?.code === 'UserNotConfirmedException') {
      return {
        exist: true,
        isConfirmed: false,
        isPasswordReset: false,
      };
    }

    if (e?.code === 'NotAuthorizedException') {
      return {
        exist: true,
        isConfirmed: true,
        isPasswordReset: false,
      };
    }

    return {
      exist: false,
      isConfirmed: false,
      isPasswordReset: false,
    };
  }
}
