import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {amplifyApi} from 'api/amplify';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from 'core/reducers';

export function* forgotPasswordSaga({
  payload: {email},
}: ActionType<typeof forgotPasswordRequest>) {
  try {
    yield call([amplifyApi, amplifyApi.forgotPassword], email);

    yield put(forgotPasswordSuccess());
  } catch (e) {
    yield put(forgotPasswordFailure(e as Error));
  }
}
