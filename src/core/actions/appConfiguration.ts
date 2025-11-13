import { createAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'core/helpers';
import { AppConfiguration, EventsPayload } from 'core/types';

export const getAppConfigurationRequest = createAsyncAction<
  void,
  AppConfiguration
>('GET_APP_CONFIGURATION');

export const setSkipAppUpdate = createAction('SET_SKIP_APP_UPDATE');
export const sendAnalyticsEvent = createAction<EventsPayload>(
  'SEND_ANALYTICS_EVENT',
);
