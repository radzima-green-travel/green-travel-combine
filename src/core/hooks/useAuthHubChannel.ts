import {eventChannel} from 'redux-saga';
import {Hub} from 'aws-amplify';

export function useAuthHubChannel() {
  return eventChannel(emitter => {
    const signListener = data => {
      emitter(data.payload.event);
    };
    Hub.listen('auth', signListener);

    return () => {
      Hub.remove('auth', signListener);
    };
  });
}
