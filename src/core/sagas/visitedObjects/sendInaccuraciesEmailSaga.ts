import {call, put} from 'redux-saga/effects';

import {
  sendInaccuraciesEmailRequest,
  sendInaccuraciesEmailSuccess,
  sendInaccuraciesEmailFailure,
} from 'core/reducers';

import {amplifyApi} from 'api/amplify';

export function* sendInaccuraciesEmailSaga({
  payload,
  meta,
}: ReturnType<typeof sendInaccuraciesEmailRequest>) {
  const {entityId} = meta || {};
  try {
    yield call(amplifyApi.sendEmail, payload);

    yield put(sendInaccuraciesEmailSuccess(undefined, {entityId}));
  } catch (e) {
    yield put(sendInaccuraciesEmailFailure(e as Error, {entityId}));
  }
}
