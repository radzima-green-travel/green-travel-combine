import {call, put} from 'redux-saga/effects';
import {changePasswordRequest} from 'core/actions';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';

export function* changePasswordSaga({
  payload: {oldPassword, newPassword},
  meta: {successAction, failureAction},
}: ReturnType<typeof changePasswordRequest>) {
  try {
    const user: CognitoUserWithAttributes = yield call(
      amplifyApi.currentAuthenticatedUser,
    );

    yield call(amplifyApi.changePassword, user, oldPassword, newPassword);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
