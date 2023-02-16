import {all, call, put, take} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
} from 'core/reducers';
import {createAuthHubChannel} from './createAuthHubChannel';
import {CognitoUserWithAttributes} from 'core/types';
import {amplifyApi} from 'api/amplify';

export function* confirmSignUpSaga({
  payload: {email, code},
}: ActionType<typeof confirmSignUpRequest>) {
  try {
    const channel = createAuthHubChannel();

    const [userData] = yield all([
      call(function* () {
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
      call(amplifyApi.confirmSignUp, email, code),
    ]);

    yield put(
      confirmSignUpSuccess(
        (userData as CognitoUserWithAttributes | null)?.attributes || null,
      ),
    );
  } catch (e) {
    yield put(confirmSignUpFailure(e as Error));
  }
}
