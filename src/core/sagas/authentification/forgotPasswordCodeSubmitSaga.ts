import { call, put } from 'redux-saga/effects';
import { forgotPasswordCodeSubmitRequest } from 'core/actions';
import { generatePassword } from 'core/helpers';
import { amplifyApi } from 'api/amplify';

export function* forgotPasswordCodeSubmitSaga({
  payload: { email, code },
  meta: { successAction, failureAction },
}: ReturnType<typeof forgotPasswordCodeSubmitRequest>) {
  try {
    const tempPassword = generatePassword(12);
    yield call(amplifyApi.forgotPasswordSubmit, email, code, tempPassword);

    yield put(successAction({ tempPassword }));
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
