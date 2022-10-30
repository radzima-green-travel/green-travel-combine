import {eventChannel} from 'redux-saga';
import {Hub} from 'aws-amplify';

export function createAuthHubChannel() {
  return eventChannel(emitter => {
    const signListener = data => {
      emitter(data);
    };
    Hub.listen('auth', signListener);

    return () => {
      Hub.remove('auth', signListener);
    };
  });
}
