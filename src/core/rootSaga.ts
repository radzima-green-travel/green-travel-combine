import {all} from 'redux-saga/effects';
import {
  bootstrapSaga,
  confirmNewPasswordSaga,
  confirmSignUpSaga,
  forgotPasswordSaga,
  homeSaga,
  objectDetailsMapSaga,
  resendSignUpCodeSaga,
  signInSaga,
  signUpSaga,
} from './sagas';

export function* rootSaga() {
  yield all([
    bootstrapSaga(),
    confirmNewPasswordSaga(),
    confirmSignUpSaga(),
    forgotPasswordSaga(),
    homeSaga(),
    objectDetailsMapSaga(),
    resendSignUpCodeSaga(),
    signInSaga(),
    signUpSaga(),
  ]);
}
