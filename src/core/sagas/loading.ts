import {EmptyActionCreator, PayloadAction} from 'typesafe-actions';
import {IState} from '../store';
import {select} from 'redux-saga/effects';
type ActionCreator = (payload: any) => PayloadAction<string, any>;

export function* loadingSaga(
  action: EmptyActionCreator<string> | ActionCreator,
) {
  const key = String(action).replace('_REQUEST', '');
  const loading = yield select((state: IState) => state.loading[key] || false);

  return loading;
}
