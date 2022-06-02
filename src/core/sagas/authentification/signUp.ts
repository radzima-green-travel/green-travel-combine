import {call, put, takeEvery} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';

import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
  resendSignUpCodeRequest,
  resendSignUpCodeSuccess,
  resendSignUpCodeFailure,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';

export function* signUpSaga() {
  yield takeEvery(
    ACTIONS.SIGNUP_REQUEST,
    function* ({payload}: ActionType<typeof signUpRequest>) {
      try {
        yield call([Auth, 'signUp'], payload);

        yield put(signUpSuccess());
      } catch (e) {
        yield put(signUpFailure(e as Error));
      }
    },
  );
}

export function* confirmSignUpSaga() {
  yield takeEvery(
    ACTIONS.CONFIRM_SIGNUP_REQUEST,
    function* ({
      payload: {email, code},
    }: ActionType<typeof confirmSignUpRequest>) {
      try {
        yield call([Auth, 'confirmSignUp'], email, code);

        yield put(confirmSignUpSuccess());
      } catch (e) {
        yield put(confirmSignUpFailure(e as Error));
      }
    },
  );
}

export function* resendSignUpCodeSaga() {
  yield takeEvery(
    ACTIONS.RESEND_SIGNUP_CODE_REQUEST,
    function* ({payload}: ActionType<typeof resendSignUpCodeRequest>) {
      try {
        yield call([Auth, 'resendSignUp'], payload);

        yield put(resendSignUpCodeSuccess());
      } catch (e) {
        yield put(resendSignUpCodeFailure(e as Error));
      }
    },
  );
}
