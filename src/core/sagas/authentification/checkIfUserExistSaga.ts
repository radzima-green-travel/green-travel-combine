import { call } from 'redux-saga/effects';
import { amplifyApi } from 'api/amplify';
import { RequestError } from 'core/errors';

export function* checkIfUserExistSaga(email: string) {
  try {
    yield call(amplifyApi.signIn, email, '000');
  } catch (e) {
    const requestError = e as RequestError;
    if (requestError.error_code === 'PASSWORD_RESET_REQUIRED') {
      return {
        exist: true,
        isConfirmed: false,
        isPasswordReset: true,
      };
    }

    if (requestError.error_code === 'USER_NOT_CONFIRMED') {
      return {
        exist: true,
        isConfirmed: false,
        isPasswordReset: false,
      };
    }

    if (requestError.error_code === 'NOT_AUTHORIZED') {
      return {
        exist: true,
        isConfirmed: true,
        isPasswordReset: false,
      };
    }

    if (requestError.error_code === 'USER_NOT_FOUND') {
      return {
        exist: false,
        isConfirmed: false,
        isPasswordReset: false,
      };
    }

    throw e;
  }
}
