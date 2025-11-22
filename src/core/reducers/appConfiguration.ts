import { createReducer } from '@reduxjs/toolkit';

import { AppConfiguration } from 'core/types';
import {
  getAppConfigurationRequest,
  setSkipAppUpdate,
} from '../actions/appConfiguration';

interface AppConfigurationState {
  data: AppConfiguration | null;
  skipUpdate: boolean;
}

const initialState: AppConfigurationState = {
  data: null,
  skipUpdate: false,
};

export const appConfigurationReducer = createReducer(initialState, builder => {
  builder.addCase(
    getAppConfigurationRequest.meta.successAction,
    (state, { payload }) => {
      return {
        ...state,
        data: payload,
      };
    },
  );

  builder.addCase(setSkipAppUpdate, state => {
    return {
      ...state,
      skipUpdate: true,
    };
  });
});
