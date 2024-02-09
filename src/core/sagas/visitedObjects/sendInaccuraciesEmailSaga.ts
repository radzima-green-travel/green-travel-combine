import {call, put} from 'redux-saga/effects';

import {
  sendInaccuraciesEmailRequest,
  sendInaccuraciesEmailSuccess,
  sendInaccuraciesEmailFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';
import {CognitoUserWithAttributes} from 'core/types';

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

export function* sendInaccuraciesEmailSaga({
  payload,
  meta,
}: ReturnType<typeof sendInaccuraciesEmailRequest>) {
  const {entityId} = meta || {};
  try {
    const userId = yield call(getUserIdSaga);
    yield call(amplifyApi.sendEmail, {...payload, userId: userId});

    yield put(sendInaccuraciesEmailSuccess(undefined, {entityId}));
  } catch (e) {
    yield put(sendInaccuraciesEmailFailure(e as Error, {entityId}));
  }
}
