import {fork, take} from 'redux-saga/effects';
import {MulticastChannel} from 'redux-saga';

const WILDCARD_MATCHER = '*';

export function takeEveryMulticast<T>(
  channel: MulticastChannel<T>,
  handler: (res: T) => void,
) {
  return fork(function* () {
    while (true) {
      const res = yield take(channel, WILDCARD_MATCHER);
      yield fork(handler, res);
    }
  });
}
