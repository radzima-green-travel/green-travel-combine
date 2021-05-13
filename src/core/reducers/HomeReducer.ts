import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ICategory, ILabelError} from '../types';
import {ACTIONS} from '../constants';
interface IDefaultState {
  data: ICategory[] | null;
  updatedData: ICategory[] | null;
  isUpdatesAvailable: boolean;
  dataHash: string | null;
  updatedHash: string | null;
}

const initialState: IDefaultState = {
  data: null,
  updatedData: null,
  isUpdatesAvailable: false,
  dataHash: null,
  updatedHash: null,
};

export const getHomeDataRequest = createAction(ACTIONS.GET_HOME_DATA_REQUEST)();
export const getHomeDataSuccess = createAction(ACTIONS.GET_HOME_DATA_SUCCESS)<{
  dataHash: string;
  data: ICategory[];
}>();
export const getHomeDataFailure = createAction(ACTIONS.GET_HOME_DATA_FAILURE)<
  ILabelError
>();

export const getHomeDataUpdateAvailableRequest = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_REQUEST,
)();
export const getHomeDataUpdateAvailableSuccess = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_SUCCESS,
)<{
  updatedHash: string | null;
  updatedData: ICategory[] | null;
}>();
export const getHomeDataUpdateAvailableFailure = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_FAILURE,
)<ILabelError>();

export const checkHomeData = createAction(ACTIONS.CHECK_HOME_DATA)();

const actions = {
  getHomeDataSuccess,
  getHomeDataUpdateAvailableSuccess,
};

export const homeReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(initialState)
  .handleAction(getHomeDataSuccess, (state, {payload: {data, dataHash}}) => ({
    ...initialState,
    data: data,
    dataHash: dataHash,
  }))

  .handleAction(
    getHomeDataUpdateAvailableSuccess,
    (state, {payload: {updatedHash, updatedData}}) => ({
      ...state,
      isUpdatesAvailable: Boolean(updatedData),
      updatedData: updatedData,
      updatedHash: updatedHash,
    }),
  );
