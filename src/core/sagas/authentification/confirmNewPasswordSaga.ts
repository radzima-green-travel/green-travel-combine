import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  confirmNewPasswordRequest,
  confirmNewPasswordSuccess,
  confirmNewPasswordFailure,
} from 'core/reducers';
import {CognitoUserWithAttributes} from '../../types';
import {amplifyApi} from 'api/amplify';

export function* confirmNewPasswordSaga({
  payload: {email, code, newPassword},
}: ActionType<typeof confirmNewPasswordRequest>) {
  try {
    yield call(amplifyApi.forgotPasswordSubmit, email, code, newPassword);

    const {attributes}: CognitoUserWithAttributes = yield call(
      amplifyApi.signIn,
      email,
      newPassword,
    );

    yield put(confirmNewPasswordSuccess(attributes));
  } catch (e) {
    yield put(confirmNewPasswordFailure(e as Error));
  }
}
