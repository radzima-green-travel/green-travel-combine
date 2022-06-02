import {call, put, takeEvery} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';

import {
  confirmNewPasswordRequest,
  confirmNewPasswordSuccess,
  confirmNewPasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';

export function* signInSaga() {
  yield takeEvery(
    ACTIONS.SIGNIN_REQUEST,
    function* ({payload: {email, password}}: ActionType<typeof signInRequest>) {
      try {
        yield call([Auth, 'signIn'], email, password);

        yield put(signInSuccess({email}));
      } catch (e) {
        yield put(signInFailure(e as Error));
      }
    },
  );
}

export function* forgotPasswordSaga() {
  yield takeEvery(
    ACTIONS.FORGOT_PASSWORD_REQUEST,
    function* ({payload: {email}}: ActionType<typeof forgotPasswordRequest>) {
      try {
        yield call([Auth, 'forgotPassword'], email);

        yield put(forgotPasswordSuccess());
      } catch (e) {
        yield put(forgotPasswordFailure(e as Error));
      }
    },
  );
}

export function* confirmNewPasswordSaga() {
  yield takeEvery(
    ACTIONS.CONFIRM_NEW_PASSWORD_REQUEST,
    function* ({
      payload: {email, code, newPassword},
    }: ActionType<typeof confirmNewPasswordRequest>) {
      try {
        yield call([Auth, 'forgotPasswordSubmit'], email, code, newPassword);

        yield put(confirmNewPasswordSuccess());
      } catch (e) {
        yield put(confirmNewPasswordFailure(e as Error));
      }
    },
  );
}
