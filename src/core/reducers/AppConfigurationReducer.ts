import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {AppConfiguration, EventsPayload} from 'core/types';

export const getAppConfigurationRequest = createAction(
  ACTIONS.GET_APP_CONFIGURATION_REQUEST,
)();
export const getAppConfigurationSuccees = createAction(
  ACTIONS.GET_APP_CONFIGURATION_SUCCESS,
)<any>();
export const getAppConfigurationFailure = createAction(
  ACTIONS.GET_APP_CONFIGURATION_FAILURE,
)<Error>();
export const setSkipAppUpdate = createAction(ACTIONS.SET_SKIP_APP_UPDATE)();
export const sendAnalyticsEvent = createAction(
  ACTIONS.SEND_ANALYTICS_EVENT,
)<EventsPayload>();

interface IDefaultState {
  data: AppConfiguration | null;
  skipUpdate: boolean;
}

const defaultState = {
  data: null,
  skipUpdate: false,
};

const actions = {
  getAppConfigurationRequest,
  getAppConfigurationSuccees,
  getAppConfigurationFailure,
  setSkipAppUpdate,
};

export const appConfigurationReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState)
  .handleAction(getAppConfigurationSuccees, (state, {payload}) => {
    return {
      ...state,
      data: payload,
    };
  })
  .handleAction(setSkipAppUpdate, state => {
    return {
      ...state,
      skipUpdate: true,
    };
  });
