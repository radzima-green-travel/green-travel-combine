import { takeEvery } from 'redux-saga/effects';
import {
  confirmNewPasswordRequest,
  confirmSignUpRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
  signInRequest,
  signUpRequest,
  signOutRequest,
  deleteUserRequest,
  checkUserEmailRequest,
  forgotPasswordCodeSubmitRequest,
  changePasswordRequest,
  clearUserData,
} from 'core/actions';
import { confirmNewPasswordSaga } from './confirmNewPasswordSaga';
import { confirmSignUpSaga } from './confirmSignUpSaga';
import { forgotPasswordSaga } from './forgotPasswordSaga';
import { resendSignUpCodeSaga } from './resendSignUpCodeSaga';
import { signInSaga } from './signInSaga';
import { signUpSaga } from './signUpSaga';
import { signInOutSaga } from './signInOutSaga';
import { deleteUserSaga } from './deleteUserSaga';
import { checkUserEmailSaga } from './checkUserEmailSaga';
import { forgotPasswordCodeSubmitSaga } from './forgotPasswordCodeSubmitSaga';
import { changePasswordSaga } from './changePasswordSaga';
import { clearUserDataSaga } from './clearUserDataSaga';

export function* authentificationSaga() {
  yield takeEvery(confirmNewPasswordRequest, confirmNewPasswordSaga);
  yield takeEvery(confirmSignUpRequest, confirmSignUpSaga);
  yield takeEvery(forgotPasswordRequest, forgotPasswordSaga);
  yield takeEvery(resendSignUpCodeRequest, resendSignUpCodeSaga);
  yield takeEvery(signInRequest, signInSaga);
  yield takeEvery(signUpRequest, signUpSaga);
  yield takeEvery(signOutRequest, signInOutSaga);
  yield takeEvery(deleteUserRequest, deleteUserSaga);
  yield takeEvery(checkUserEmailRequest, checkUserEmailSaga);
  yield takeEvery(
    forgotPasswordCodeSubmitRequest,
    forgotPasswordCodeSubmitSaga,
  );
  yield takeEvery(changePasswordRequest, changePasswordSaga);
  yield takeEvery(clearUserData, clearUserDataSaga);
}
