import {takeEvery} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {confirmNewPasswordSaga} from './confirmNewPasswordSaga';
import {confirmSignUpSaga} from './confirmSignUpSaga';
import {forgotPasswordSaga} from './forgotPasswordSaga';
import {resendSignUpCodeSaga} from './resendSignUpCodeSaga';
import {signInSaga} from './signInSaga';
import {signUpSaga} from './signUpSaga';
import {signInOutSaga} from './signInOutSaga';
import {deleteUserSaga} from './deleteUserSaga';
import {checkUserEmailSaga} from './checkUserEmailSaga';
import {forgotPasswordCodeSubmitSaga} from './forgotPasswordCodeSubmitSaga';
import {changePasswordSaga} from './changePasswordSaga';
import {clearUserDataSaga} from './clearUserDataSaga';

export function* authentificationSaga() {
  yield takeEvery(ACTIONS.CONFIRM_NEW_PASSWORD_REQUEST, confirmNewPasswordSaga);
  yield takeEvery(ACTIONS.CONFIRM_SIGNUP_REQUEST, confirmSignUpSaga);
  yield takeEvery(ACTIONS.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeEvery(ACTIONS.RESEND_SIGNUP_CODE_REQUEST, resendSignUpCodeSaga);
  yield takeEvery(ACTIONS.SIGNIN_REQUEST, signInSaga);
  yield takeEvery(ACTIONS.SIGNUP_REQUEST, signUpSaga);
  yield takeEvery(ACTIONS.SIGNOUT_REQUEST, signInOutSaga);
  yield takeEvery(ACTIONS.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeEvery(ACTIONS.CHECK_USER_EMAIL_REQUEST, checkUserEmailSaga);
  yield takeEvery(
    ACTIONS.FORGOT_PASSWORD_CODE_SUBMIT_REQUEST,
    forgotPasswordCodeSubmitSaga,
  );
  yield takeEvery(ACTIONS.CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeEvery(ACTIONS.CLEAR_USER_DATA, clearUserDataSaga);
}
