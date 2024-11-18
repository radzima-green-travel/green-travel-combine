import {CognitoUserAttributes} from 'core/types';
import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {
  resetUserAuthData,
  clearUserData,
  signInRequest,
  setUserAuthData,
  confirmSignUpRequest,
  confirmNewPasswordRequest,
  deleteUserRequest,
} from 'core/actions';

interface InitialState {
  userAttributes: CognitoUserAttributes | null;
}

const initialState: InitialState = {
  userAttributes: null,
};

export const authenticationReducer = createReducer(initialState, builder => {
  builder
    .addMatcher(
      isAnyOf(
        signInRequest.meta.successAction,
        confirmSignUpRequest.meta.successAction,
        confirmNewPasswordRequest.meta.successAction,
        setUserAuthData,
      ),
      (state, {payload}) => ({
        ...state,
        userAttributes: payload,
      }),
    )
    .addMatcher(
      isAnyOf(
        deleteUserRequest.meta.successAction,
        resetUserAuthData,
        clearUserData,
      ),
      () => initialState,
    );
});
