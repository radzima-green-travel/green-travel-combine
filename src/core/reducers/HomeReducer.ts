import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ICategory, ILabelError, ITransformedData} from '../types';
import {ACTIONS} from '../constants';
import {transformMainData} from '../helpers';
interface IDefaultState {
  data: ICategory[] | null;
  transformedData: ITransformedData | null;
}

const initialState: IDefaultState = {
  data: null,
  transformedData: null,
};

export const getHomeDataRequest = createAction(ACTIONS.GET_HOME_DATA_REQUEST)();
export const getHomeDataSuccess = createAction(ACTIONS.GET_HOME_DATA_SUCCESS)<
  ICategory[]
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
  transformedData: transformMainData(payload),
}));
