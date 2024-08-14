import {selectUserAuthorized} from 'core/selectors';
import {AppStateStatus} from 'react-native';
import {call, select} from 'redux-saga/effects';
import {getObjectAttributesSaga} from '../objectAttributes';

export function* listenAppStateChangesSaga({
  state,
  prevSate,
}: {
  state: AppStateStatus;
  prevSate: AppStateStatus;
}) {
  const isAuthorized = yield select(selectUserAuthorized);
  if (state === 'active' && prevSate === 'background') {
    if (isAuthorized) {
      yield call(getObjectAttributesSaga);
    }
  }
}
