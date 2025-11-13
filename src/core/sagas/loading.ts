import { Action } from 'react-redux-help-kit';
import { IState } from '../store';
import { select } from 'redux-saga/effects';

export function* loadingSaga(action: Action) {
  const key = String(action).replace('_REQUEST', '');
  const loading = yield select((state: IState) => state.loading[key] || false);

  return loading;
}
