import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from 'core/reducers';

export function* forgotPasswordSaga({
  payload: {email},
}: ActionType<typeof forgotPasswordRequest>) {
  try {
    yield call([Auth, 'forgotPassword'], email);

    yield put(forgotPasswordSuccess());
  } catch (e) {
    yield put(forgotPasswordFailure(e as Error));
  }
}
