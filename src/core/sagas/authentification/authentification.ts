import {takeEvery} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {confirmNewPasswordSaga} from './confirmNewPasswordSaga';
import {confirmSignUpSaga} from './confirmSignUpSaga';
import {forgotPasswordSaga} from './forgotPasswordSaga';
import {resendSignUpCodeSaga} from './resendSignUpCodeSaga';
import {signInSaga} from './signInSaga';
import {signUpSaga} from './signUpSaga';
import {userAuthorizedSaga} from './userAuthorizedSaga';

export function* authentificationSaga() {
  yield takeEvery(ACTIONS.CONFIRM_NEW_PASSWORD_REQUEST, confirmNewPasswordSaga);
  yield takeEvery(ACTIONS.CONFIRM_SIGNUP_REQUEST, confirmSignUpSaga);
  yield takeEvery(ACTIONS.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeEvery(ACTIONS.RESEND_SIGNUP_CODE_REQUEST, resendSignUpCodeSaga);
  yield takeEvery(ACTIONS.SIGNIN_REQUEST, signInSaga);
  yield takeEvery(ACTIONS.SIGNUP_REQUEST, signUpSaga);
  yield takeEvery(ACTIONS.USER_AUTHORIZED_REQUEST, userAuthorizedSaga);
}
