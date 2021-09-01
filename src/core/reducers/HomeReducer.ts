import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ICategory, ILabelError} from '../types';
import {ACTIONS} from '../constants';
interface IDefaultState {
  data: ICategory[] | null;
  updatedData: ICategory[] | null;
  isUpdatesAvailable: boolean;
}

const initialState: IDefaultState = {
  data: null,
  updatedData: null,
  isUpdatesAvailable: false,
};

export const getInitialHomeDataRequest = createAction(
  ACTIONS.GET_INITIAL_HOME_DATA_REQUEST,
)();
export const getInitialHomeDataSuccess = createAction(
  ACTIONS.GET_INITIAL_HOME_DATA_SUCCESS,
)<{
  data: ICategory[];
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
  data: ICategory[] | null;
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
  updatedData: ICategory[] | null;
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
    data: data,
  }))
  .handleAction(getHomeDataUpdatesSuccess, (state, {payload: {data}}) => ({
    ...initialState,
    data: data || (state.data && [...state.data]),
  }))

  .handleAction(
    getHomeDataUpdateAvailableSuccess,
    (state, {payload: {updatedData}}) => ({
      ...state,
      isUpdatesAvailable: Boolean(updatedData || state.updatedData),
      updatedData: updatedData || state.updatedData,
    }),
  );
