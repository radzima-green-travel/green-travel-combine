import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from 'core/reducers';
import {CognitoUserWithAttributes} from '../../types';
import {amplifyApi} from 'api/amplify';

export function* changePasswordSaga({
  payload: {oldPassword, newPassword},
}: ActionType<typeof changePasswordRequest>) {
  try {
    const user: CognitoUserWithAttributes = yield call(
      amplifyApi.currentAuthenticatedUser,
    );

    yield call(amplifyApi.changePassword, user, oldPassword, newPassword);

    yield put(changePasswordSuccess());
  } catch (e) {
    yield put(changePasswordFailure(e as Error));
  }
}
