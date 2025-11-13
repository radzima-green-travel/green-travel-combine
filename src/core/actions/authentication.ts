import { createAction } from '@reduxjs/toolkit';
import { ACTIONS } from 'core/constants';
import { createAsyncAction } from 'core/helpers';
import { CognitoUserAttributes } from 'core/types';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export const resetUserAuthData = createAction(ACTIONS.RESET_USER_AUTH_DATA);

export const clearUserData = createAction(ACTIONS.CLEAR_USER_DATA);

export const changePasswordRequest = createAsyncAction<
  {
    oldPassword: string;
    newPassword: string;
  },
  void,
  Error
>(ACTIONS.CHANGE_PASSWORD);

export const forgotPasswordCodeSubmitRequest = createAsyncAction<
  { email: string; code: string },
  {
    tempPassword: string;
  },
  Error
>(ACTIONS.FORGOT_PASSWORD_CODE_SUBMIT);

export const inAppBrowserCancelOperation = createAction(
  ACTIONS.IN_APP_BROWSER_CANCEL_OPERATION,
);
export const inAppBrowserSuccessOperation = createAction(
  ACTIONS.IN_APP_BROWSER_SUCCESS_OPERATION,
);

export const checkUserEmailRequest = createAsyncAction<
  string,
  { exist: boolean; isConfirmed: boolean; isPasswordReset: boolean },
  Error
>(ACTIONS.CHECK_USER_EMAIL);

export const resendSignUpCodeRequest = createAsyncAction<string, void, Error>(
  ACTIONS.RESEND_SIGNUP_CODE,
);

export const confirmSignUpRequest = createAsyncAction<
  {
    email: string;
    code: string;
  },
  CognitoUserAttributes | null,
  Error
>(ACTIONS.CONFIRM_SIGNUP);

export const confirmSignUpCancel = createAction(ACTIONS.CONFIRM_SIGNUP_CANCEL);

export const signUpRequest = createAsyncAction<
  {
    email: string;
    password: string;
  },
  string,
  Error
>(ACTIONS.SIGNUP);

export const setUserAuthData = createAction<CognitoUserAttributes>(
  ACTIONS.SET_USER_AUTH_DATA,
);

export const confirmNewPasswordRequest = createAsyncAction<
  {
    email: string;
    tempPassword: string;
    newPassword: string;
  },
  CognitoUserAttributes,
  Error
>(ACTIONS.CONFIRM_NEW_PASSWORD);

export const forgotPasswordRequest = createAsyncAction<
  {
    email: string;
  },
  void,
  Error
>(ACTIONS.FORGOT_PASSWORD);

export const deleteUserRequest = createAsyncAction<void, void, Error>(
  ACTIONS.DELETE_USER,
);

export const signOutRequest = createAsyncAction<void, void, Error>(
  ACTIONS.SIGNOUT,
);

export const signInRequest = createAsyncAction<
  {
    email?: string;
    password?: string;
    socialProvider?: CognitoHostedUIIdentityProvider;
  },
  CognitoUserAttributes | null,
  Error
>(ACTIONS.SIGNIN);
