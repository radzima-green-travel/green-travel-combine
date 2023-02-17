import {call} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {SupportedLocales} from 'core/types';

export function* updateUserAttributesSaga({
  locale,
}: {
  locale: SupportedLocales;
}) {
  try {
    const user = yield call([Auth, Auth.currentAuthenticatedUser]);

    yield call([Auth, Auth.updateUserAttributes], user, {
      'custom:locale': locale,
    });
  } catch (e) {
    console.log(e as Error);
  }
}
