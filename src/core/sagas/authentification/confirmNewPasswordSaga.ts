import {call, put} from 'redux-saga/effects';
import {confirmNewPasswordRequest} from 'core/actions';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';
import {getObjectAttributesSaga} from 'core/sagas';

export function* confirmNewPasswordSaga({
  payload: {email, tempPassword, newPassword},
  meta: {successAction, failureAction},
}: ReturnType<typeof confirmNewPasswordRequest>) {
  try {
    const user: CognitoUserWithAttributes = yield call(
      amplifyApi.signIn,
      email,
      tempPassword,
    );

    const {attributes} = user;

    yield call(amplifyApi.changePassword, user, tempPassword, newPassword);
    yield call(getObjectAttributesSaga);

    yield put(successAction(attributes));
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
