import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {
  confirmNewPasswordRequest,
  confirmNewPasswordSuccess,
  confirmNewPasswordFailure,
} from 'core/reducers';
import {CognitoUserWithAttributes} from '../../types';

export function* confirmNewPasswordSaga({
  payload: {email, code, newPassword},
}: ActionType<typeof confirmNewPasswordRequest>) {
  try {
    yield call([Auth, Auth.forgotPasswordSubmit], email, code, newPassword);

    const {attributes}: CognitoUserWithAttributes = yield call(
      [Auth, Auth.signIn],
      email,
      newPassword,
    );

    yield put(confirmNewPasswordSuccess(attributes));
  } catch (e) {
    yield put(confirmNewPasswordFailure(e as Error));
  }
}
