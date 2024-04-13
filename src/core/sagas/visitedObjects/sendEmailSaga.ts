import {call, put} from 'redux-saga/effects';

import {amplifyApi} from 'api/amplify';
import {CognitoUserWithAttributes} from 'core/types';
import {
  sendAddInfoEmailRequest,
  sendInaccuraciesEmailRequest,
} from 'core/reducers';

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
  meta: {success, failure},
}: ReturnType<
  typeof sendInaccuraciesEmailRequest | typeof sendAddInfoEmailRequest
>) {
  const {showSuccessMenu = true, ...emailData} = payload;
  try {
    const userId = yield call(getUserIdSaga);

    yield call(amplifyApi.sendEmail, {...emailData, userId});

    yield put(success(showSuccessMenu));
  } catch (e: any) {
    yield put(failure(e));
  }
}
