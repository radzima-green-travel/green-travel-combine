import {call, put} from 'redux-saga/effects';

import {
  sendInaccuraciesEmailRequest,
  sendInaccuraciesEmailSuccess,
  sendInaccuraciesEmailFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* sendInaccuraciesEmailSaga({
  payload,
}: ReturnType<typeof sendInaccuraciesEmailRequest>) {
  try {
    yield call(amplifyApi.sendEmail, payload);

    yield put(sendInaccuraciesEmailSuccess());
  } catch (e) {
    yield put(sendInaccuraciesEmailFailure(e as Error));
  }
}
