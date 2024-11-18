import {call, put} from 'redux-saga/effects';

import {amplifyApi} from 'api/amplify';
import {CognitoUserWithAttributes} from 'core/types';
import {
  sendAddInfoEmailRequest,
  sendInaccuraciesEmailRequest,
} from 'core/actions';

export function* getUserIdSaga() {
  try {
    const {username}: CognitoUserWithAttributes = yield call(
      amplifyApi.currentAuthenticatedUser,
    );
    return username;
  } catch (e) {
    return null;
  }
}

export function* sendEmailSaga({
  payload,
  meta: {successAction, failureAction},
}: ReturnType<
  typeof sendInaccuraciesEmailRequest | typeof sendAddInfoEmailRequest
>) {
  const {showSuccessMenu = true, ...emailData} = payload;
  try {
    const userId = yield call(getUserIdSaga);

    yield call(amplifyApi.sendEmail, {...emailData, userId});

    yield put(successAction(showSuccessMenu));
  } catch (e: any) {
    yield put(failureAction(e));
  }
}
