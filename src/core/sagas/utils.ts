import {fork, take} from 'redux-saga/effects';
import {NotUndefined} from '@redux-saga/types';

import {MulticastChannel} from 'redux-saga';

const WILDCARD_MATCHER = '*';

export function takeEveryMulticast<T extends NotUndefined>(
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
