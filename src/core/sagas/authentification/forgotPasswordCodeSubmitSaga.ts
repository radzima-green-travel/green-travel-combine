import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  forgotPasswordCodeSubmitRequest,
  forgotPasswordCodeSubmitSuccess,
  forgotPasswordCodeSubmitFailure,
} from 'core/reducers';
import {generatePassword} from '../../helpers';

import {amplifyApi} from 'api/amplify';

export function* forgotPasswordCodeSubmitSaga({
  payload: {email, code},
}: ActionType<typeof forgotPasswordCodeSubmitRequest>) {
  try {
    const tempPassword = generatePassword(12);
    yield call(amplifyApi.forgotPasswordSubmit, email, code, tempPassword);

    yield put(forgotPasswordCodeSubmitSuccess({tempPassword}));
  } catch (e) {
    yield put(forgotPasswordCodeSubmitFailure(e as Error));
  }
}
