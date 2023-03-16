import {all, call, put, take, race} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
  confirmSignUpCancel,
} from 'core/reducers';
import {createAuthHubChannel} from './createAuthHubChannel';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';
import {createSignupCancelErrorPreset, RequestError} from 'core/errors';

export function* confirmSignUpSaga({
  payload: {email, code},
}: ActionType<typeof confirmSignUpRequest>) {
  const channel = createAuthHubChannel();

  try {
    const [{userData}] = yield all([
      race({
        userData: call(function* () {
          while (true) {
            const data = yield take(channel);

            if (
              data?.payload?.event === 'autoSignIn' ||
              data?.payload?.event === 'autoSignIn_failure'
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

    yield put(
      confirmSignUpSuccess(
        (userData as CognitoUserWithAttributes | null)?.attributes || null,
      ),
    );
  } catch (e) {
    yield put(confirmSignUpFailure(e as Error));
  } finally {
    channel.close();
  }
}
