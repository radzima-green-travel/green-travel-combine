import {AnyAction} from 'redux';
import {createAction} from 'typesafe-actions';
import {ILabelError} from '../types';
import {ACTIONS} from '../constants';

export const clearErrorByActionType = createAction(
  ACTIONS.CLEAR_ERROR_BY_ACTION_TYPE,
  (actionType: string) => actionType,
)();

interface IErrorReducerState {
  [actionType: string]: ILabelError;
}

export const errorReducer = (
  state: IErrorReducerState = {},
  action: AnyAction,
): IErrorReducerState => {
  const {type, payload} = action;

  if (type === ACTIONS.CLEAR_ERROR_BY_ACTION_TYPE) {
    return {
      ...state,
      [payload]: null,
    };
  }

  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload : null,
  };
};
