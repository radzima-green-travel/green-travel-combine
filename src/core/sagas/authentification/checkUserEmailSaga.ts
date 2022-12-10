import {put, call} from 'redux-saga/effects';
import {
  checkUserEmailRequest,
  checkUserEmailSuccess,
  checkUserEmailFailure,
} from '../../reducers';
import {checkIfUserExistSaga} from './checkIfUserExistSaga';

export function* checkUserEmailSaga({
  payload: email,
}: ReturnType<typeof checkUserEmailRequest>) {
  try {
    const data: {
      exist: boolean;
      isConfirmed: boolean;
      isPasswordReset: boolean;
    } = yield call(checkIfUserExistSaga, email);

    yield put(checkUserEmailSuccess(data));
  } catch (e) {
    yield put(checkUserEmailFailure(e as Error));
  }
}
