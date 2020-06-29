import {AnyAction} from 'redux';
import {createAction} from 'typesafe-actions';
import {ACTIONS} from '../constants';

export const clearSuccessByActionType = createAction(
  ACTIONS.CLEAR_SUCCESS_BY_ACTION_TYPE,
  (actionType: string) => actionType,
)();

interface ISuccessReducerState {
  [actionType: string]: boolean;
}

export const successReducer = (
  state: ISuccessReducerState = {},
  action: AnyAction,
): ISuccessReducerState => {
  const {type, payload} = action;

  if (type === ACTIONS.CLEAR_SUCCESS_BY_ACTION_TYPE) {
    return {
      ...state,
      [payload]: null,
    };
  }

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]:
      (requestState === 'REQUEST' && null) ||
      (requestState === 'SUCCESS' && true) ||
      (requestState === 'FAILURE' && false),
  };
};
