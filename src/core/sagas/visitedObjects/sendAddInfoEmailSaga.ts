import {
  sendAddInfoEmailRequest,
  sendAddInfoEmailSuccess,
  sendAddInfoEmailFailure,
} from 'core/reducers';
import {sendEmailSaga} from './sendEmailSaga';

export function* sendAddInfoEmailSaga({
  payload,
}: ReturnType<typeof sendAddInfoEmailRequest>) {
  yield sendEmailSaga({
    payload,
    successAction: sendAddInfoEmailSuccess,
    failureAction: sendAddInfoEmailFailure,
  });
}
