import {amplifyApi} from 'api/amplify';
import {setUserAuthData, resetUserAuthData, clearUserData} from 'core/actions';
import {selectUserAuthorized} from 'core/selectors';
import {CognitoUserWithAttributes} from 'core/types';
import {call, put, select} from 'redux-saga/effects';

export function* initUserAuthSaga() {
  try {
    const {attributes}: CognitoUserWithAttributes = yield call(
      amplifyApi.currentAuthenticatedUser,
      {
        bypassCache: true,
      },
    );

    yield put(setUserAuthData(attributes));
  } catch (e) {
    const isAuthorized = yield select(selectUserAuthorized);
    if (isAuthorized) {
      yield put(resetUserAuthData());
      yield put(clearUserData());
    }

    console.log('error', e);
  }
}
