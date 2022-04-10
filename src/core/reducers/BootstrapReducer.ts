import {createAction, createReducer, ActionType} from 'typesafe-actions';

import {ACTIONS} from '../constants';
import {ILabelError} from '../types';

export const bootstrapRequest = createAction(ACTIONS.BOOTSTRAP_REQUEST)();
export const bootstrapSuccess = createAction(ACTIONS.BOOTSTRAP_SUCCESS)();
export const bootstrapFailure = createAction(
  ACTIONS.BOOTSTRAP_FAILURE,
)<ILabelError>();

export interface IBootsrap {
  finished: boolean;
}

const defaultState: IBootsrap = {
  finished: false,
};

const actions = {
  bootstrapSuccess,
  bootstrapFailure,
};

type Actions = ActionType<typeof actions>;

export const bootstrapReducer = createReducer<IBootsrap, Actions>(
  defaultState,
).handleAction([actions.bootstrapSuccess, actions.bootstrapFailure], () => {
  return {
    finished: true,
  };
});
