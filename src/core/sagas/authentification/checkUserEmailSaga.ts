import { put, call } from 'redux-saga/effects';
import { checkUserEmailRequest } from 'core/actions';
import { checkIfUserExistSaga } from './checkIfUserExistSaga';

export function* checkUserEmailSaga({
  meta: { successAction, failureAction },
  payload: email,
}: ReturnType<typeof checkUserEmailRequest>) {
  try {
    const data: {
      exist: boolean;
      isConfirmed: boolean;
      isPasswordReset: boolean;
    } = yield call(checkIfUserExistSaga, email);

    yield put(successAction(data));
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
