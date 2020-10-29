import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ICategoryWithObjects, ILabelError} from '../types';
import {ACTIONS} from '../constants';
interface IDefaultState {
  data: ICategoryWithObjects[] | null;
}

const initialState: IDefaultState = {
  data: null,
};

export const getHomeDataRequest = createAction(ACTIONS.GET_HOME_DATA_REQUEST)();
export const getHomeDataSuccess = createAction(ACTIONS.GET_HOME_DATA_SUCCESS)<
  ICategoryWithObjects[]
>();
export const getHomeDataFailure = createAction(ACTIONS.GET_HOME_DATA_FAILURE)<
  ILabelError
>();

const actions = {
  getHomeDataSuccess,
};

export const homeReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(initialState).handleAction(getHomeDataSuccess, (state, {payload}) => ({
  ...state,
  data: payload,
}));
