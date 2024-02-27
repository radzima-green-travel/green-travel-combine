import {call, put} from 'redux-saga/effects';

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

export function* sendEmailSaga({payload, successAction, failureAction}) {
  try {
    const userId = yield call(getUserIdSaga);

    yield call(amplifyApi.sendEmail, {...payload, userId});

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e));
  }
}
