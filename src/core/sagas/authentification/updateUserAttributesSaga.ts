import { call } from 'redux-saga/effects';
import { amplifyApi } from 'api/amplify';
import { SupportedLocales } from 'core/types';

export function* updateUserAttributesSaga({
  locale,
}: {
  locale: SupportedLocales;
}) {
  try {
    const user = yield call(amplifyApi.currentAuthenticatedUser);

    yield call(amplifyApi.updateUserAttributes, user, {
      'custom:locale': locale,
    });
  } catch (e) {
    console.log(e as Error);
  }
}
