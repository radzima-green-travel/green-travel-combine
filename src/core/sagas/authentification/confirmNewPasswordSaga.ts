import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {
  confirmNewPasswordRequest,
  confirmNewPasswordSuccess,
  confirmNewPasswordFailure,
} from 'core/reducers';

export function* confirmNewPasswordSaga({
  payload: {email, code, newPassword},
}: ActionType<typeof confirmNewPasswordRequest>) {
  try {
    yield call([Auth, 'forgotPasswordSubmit'], email, code, newPassword);

    yield put(confirmNewPasswordSuccess());
  } catch (e) {
    yield put(confirmNewPasswordFailure(e as Error));
  }
}
