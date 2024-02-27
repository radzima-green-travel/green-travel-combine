import {
  sendInaccuraciesEmailRequest,
  sendInaccuraciesEmailSuccess,
  sendInaccuraciesEmailFailure,
} from 'core/reducers';
import {sendEmailSaga} from './sendEmailSaga';

export function* sendInaccuraciesEmailSaga({
  payload,
  meta,
}: ReturnType<typeof sendInaccuraciesEmailRequest>) {
  const {entityId} = meta || {};

  yield sendEmailSaga({
    payload,
    successAction: () => sendInaccuraciesEmailSuccess(undefined, {entityId}),
    failureAction: (e: Error) => sendInaccuraciesEmailFailure(e, {entityId}),
  });
}
