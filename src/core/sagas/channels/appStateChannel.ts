import {AppState, AppStateStatus} from 'react-native';
import {multicastChannel} from 'redux-saga';

function createAppStateChannel() {
  const chan = multicastChannel<{
    state: AppStateStatus;
    prevSate: AppStateStatus;
  }>();

  let prevSate: AppStateStatus = AppState.currentState;

  const listener = (state: AppStateStatus) => {
    chan.put({state, prevSate});
    prevSate = state;
  };

  const subscription = AppState.addEventListener('change', listener);

  const close = () => {
    subscription.remove();
  };

  return {
    ...chan,
    close,
  };
}

export const appStateChannel = createAppStateChannel();
