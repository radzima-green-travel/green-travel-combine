import {AnyAction} from 'redux';

interface ILoadingReducerState {
  [actionType: string]: boolean;
}

export const loadingReducer = (
  state: ILoadingReducerState = {},
  action: AnyAction,
): ILoadingReducerState => {
  const {type} = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};
