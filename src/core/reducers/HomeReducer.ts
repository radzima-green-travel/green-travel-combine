import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ILabelError} from '../types';
import {ACTIONS} from '../constants';
import {ListMobileDataQuery} from 'api/graphql/types';
interface IDefaultState {
  currentData: ListMobileDataQuery | null;
  updatedData: ListMobileDataQuery | null;
  isUpdatesAvailable: boolean;
}

const initialState: IDefaultState = {
  currentData: null,
  updatedData: null,
  isUpdatesAvailable: false,
};

export const getInitialHomeDataRequest = createAction(
  ACTIONS.GET_INITIAL_HOME_DATA_REQUEST,
)();
export const getInitialHomeDataSuccess = createAction(
  ACTIONS.GET_INITIAL_HOME_DATA_SUCCESS,
)<{
  data: ListMobileDataQuery;
}>();
export const getInitialHomeDataFailure = createAction(
  ACTIONS.GET_INITIAL_HOME_DATA_FAILURE,
)<ILabelError>();

export const getHomeDataUpdatesRequest = createAction(
  ACTIONS.GET_HOME_DATA_UPDATES_REQUEST,
)();
export const getHomeDataUpdatesSuccess = createAction(
  ACTIONS.GET_HOME_DATA_UPDATES_SUCCESS,
)<{
  data: ListMobileDataQuery | null;
}>();
export const getHomeDataUpdatesFailure = createAction(
  ACTIONS.GET_HOME_DATA_UPDATES_FAILURE,
)<ILabelError>();

export const getHomeDataUpdateAvailableRequest = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_REQUEST,
)();
export const getHomeDataUpdateAvailableSuccess = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_SUCCESS,
)<{
  updatedData: ListMobileDataQuery | null;
}>();
export const getHomeDataUpdateAvailableFailure = createAction(
  ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_FAILURE,
)<ILabelError>();

export const getHomeData = createAction(ACTIONS.GET_HOME_DATA)();

const actions = {
  getInitialHomeDataSuccess,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdatesSuccess,
};

export const homeReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(initialState)
  .handleAction(getInitialHomeDataSuccess, (state, {payload: {data}}) => ({
    ...initialState,
    currentData: data,
  }))
  .handleAction(getHomeDataUpdatesSuccess, (state, {payload: {data}}) => ({
    ...initialState,
    currentData: data || state.currentData,
  }))

  .handleAction(
    getHomeDataUpdateAvailableSuccess,
    (state, {payload: {updatedData}}) => ({
      ...state,
      isUpdatesAvailable: Boolean(updatedData || state.updatedData),
      updatedData: updatedData || state.updatedData,
    }),
  );
