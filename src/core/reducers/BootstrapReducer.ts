import {createAction, createReducer, ActionType} from 'typesafe-actions';

import {ACTIONS} from '../constants';

export const bootstrapStart = createAction(ACTIONS.BOOTSTRAP_START)();
export const bootstrapFinish = createAction(ACTIONS.BOOTSTRAP_FINISH)();

export interface IBootsrap {
  finished: boolean;
}

const defaultState: IBootsrap = {
  finished: false,
};

const actions = {
  bootstrapStart,
  bootstrapFinish,
};

type Actions = ActionType<typeof actions>;

export const bootstrapReducer = createReducer<IBootsrap, Actions>(
  defaultState,
).handleAction(bootstrapFinish, () => {
  return {
    finished: true,
  };
});
