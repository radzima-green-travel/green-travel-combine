import { all, call, put, take, race } from 'redux-saga/effects';
import { confirmSignUpRequest, confirmSignUpCancel } from 'core/actions';
import { createAuthHubChannel } from './createAuthHubChannel';
import { CognitoUserWithAttributes } from 'core/types';
import { amplifyApi } from 'api/amplify';
import { createSignupCancelErrorPreset, RequestError } from 'core/errors';
import { getObjectAttributesSaga } from '../objectAttributes';

export function* confirmSignUpSaga({
  payload: { email, code },
  meta: { successAction, failureAction },
}: ReturnType<typeof confirmSignUpRequest>) {
  const channel = createAuthHubChannel();

  try {
    const [{ userData }] = yield all([
      race({
        userData: call(function* () {
          while (true) {
            const data = yield take(channel);

            if (
              data?.payload?.event === 'autoSignIn'
              || data?.payload?.event === 'autoSignIn_failure'
            ) {
              return data?.payload?.data;
            }
          }
        }),
        cancel: call(function* () {
          yield take(confirmSignUpCancel);
          throw new RequestError(createSignupCancelErrorPreset());
        }),
      }),
      call(amplifyApi.confirmSignUp, email, code),
    ]);

    if (userData) {
      yield call(getObjectAttributesSaga);
    }

    yield put(
      successAction(
        (userData as CognitoUserWithAttributes | null)?.attributes || null,
      ),
    );
  } catch (e) {
    yield put(failureAction(e as Error));
  } finally {
    channel.close();
  }
}
