import {useSelector} from 'react-redux';
import {EmptyActionCreator, PayloadAction} from 'typesafe-actions';
import {IState} from '../store';

type ActionCreator = (payload: any) => PayloadAction<string, any>;

export function useRequestLoading(
  action: EmptyActionCreator<string> | ActionCreator,
): boolean {
  const key = String(action).replace('_REQUEST', '');
  return useSelector((state: IState) => state.loading[key] || false);
}
