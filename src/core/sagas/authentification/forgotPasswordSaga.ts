import {call, put} from 'redux-saga/effects';
import {amplifyApi} from 'api/amplify';
import {forgotPasswordRequest} from 'core/actions';

export function* forgotPasswordSaga({
  payload: {email},
  meta: {successAction, failureAction},
}: ReturnType<typeof forgotPasswordRequest>) {
  try {
    yield call([amplifyApi, amplifyApi.forgotPassword], email);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
