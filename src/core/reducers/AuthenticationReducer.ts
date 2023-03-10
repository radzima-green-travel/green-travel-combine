import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {CognitoUserAttributes} from '../types';

export const signInRequest = createAction(ACTIONS.SIGNIN_REQUEST)<{
  email: string;
  password: string;
}>();
export const signInSuccess = createAction(ACTIONS.SIGNIN_SUCCESS)<{
  email: string;
  userAttributes: CognitoUserAttributes;
}>();
export const signInFailure = createAction(ACTIONS.SIGNIN_FAILURE)<Error>();

export const signOutRequest = createAction(ACTIONS.SIGNOUT_REQUEST)();
export const signOutSuccess = createAction(ACTIONS.SIGNOUT_SUCCESS)();
export const signOutFailure = createAction(ACTIONS.SIGNOUT_FAILURE)<Error>();

export const deleteUserRequest = createAction(ACTIONS.DELETE_USER_REQUEST)();
export const deleteUserSuccess = createAction(ACTIONS.DELETE_USER_SUCCESS)();
export const deleteUserFailure = createAction(
  ACTIONS.DELETE_USER_FAILURE,
)<Error>();

export const forgotPasswordRequest = createAction(
  ACTIONS.FORGOT_PASSWORD_REQUEST,
)<{
  email: string;
}>();
export const forgotPasswordSuccess = createAction(
  ACTIONS.FORGOT_PASSWORD_SUCCESS,
)();
export const forgotPasswordFailure = createAction(
  ACTIONS.FORGOT_PASSWORD_FAILURE,
)<Error>();

export const confirmNewPasswordRequest = createAction(
  ACTIONS.CONFIRM_NEW_PASSWORD_REQUEST,
)<{
  email: string;
  tempPassword: string;
  newPassword: string;
}>();
export const confirmNewPasswordSuccess = createAction(
  ACTIONS.CONFIRM_NEW_PASSWORD_SUCCESS,
)<CognitoUserAttributes>();
export const confirmNewPasswordFailure = createAction(
  ACTIONS.CONFIRM_NEW_PASSWORD_FAILURE,
)<Error>();

export const setUserAuthData =
  createAction('SET_USER_AUTH_DATA')<CognitoUserAttributes>();
export const clearUserAuthData = createAction('CLEAR_USER_AUTH_DATA')();

export const signUpRequest = createAction(ACTIONS.SIGNUP_REQUEST)<{
  email: string;
  password: string;
}>();
export const signUpSuccess = createAction(ACTIONS.SIGNUP_SUCCESS)<string>();
export const signUpFailure = createAction(ACTIONS.SIGNUP_FAILURE)<Error>();

export const confirmSignUpRequest = createAction(
  ACTIONS.CONFIRM_SIGNUP_REQUEST,
)<{
  email: string;
  code: string;
}>();
export const confirmSignUpSuccess = createAction(
  ACTIONS.CONFIRM_SIGNUP_SUCCESS,
)<CognitoUserAttributes | null>();
export const confirmSignUpFailure = createAction(
  ACTIONS.CONFIRM_SIGNUP_FAILURE,
)<Error>();

export const resendSignUpCodeRequest = createAction(
  ACTIONS.RESEND_SIGNUP_CODE_REQUEST,
)<string>();
export const resendSignUpCodeSuccess = createAction(
  ACTIONS.RESEND_SIGNUP_CODE_SUCCESS,
)();
export const resendSignUpCodeFailure = createAction(
  ACTIONS.RESEND_SIGNUP_CODE_FAILURE,
)<Error>();

export const checkUserEmailRequest = createAction(
  ACTIONS.CHECK_USER_EMAIL_REQUEST,
)<string>();

export const checkUserEmailSuccess = createAction(
  ACTIONS.CHECK_USER_EMAIL_SUCCESS,
)<{
  exist: boolean;
  isConfirmed: boolean;
}>();
export const checkUserEmailFailure = createAction(
  ACTIONS.CHECK_USER_EMAIL_FAILURE,
)<Error>();

export const forgotPasswordCodeSubmitRequest = createAction(
  ACTIONS.FORGOT_PASSWORD_CODE_SUBMIT_REQUEST,
)<{
  email: string;
  code: string;
}>();

export const forgotPasswordCodeSubmitSuccess = createAction(
  ACTIONS.FORGOT_PASSWORD_CODE_SUBMIT_SUCCESS,
)<{
  tempPassword: string;
}>();
export const forgotPasswordCodeSubmitFailure = createAction(
  ACTIONS.FORGOT_PASSWORD_CODE_SUBMIT_FAILURE,
)<Error>();

export const googleSigninRequest = createAction(
  ACTIONS.GOOGLE_SIGNIN_REQUEST,
)();

export const googleSigninSuccess = createAction(
  ACTIONS.GOOGLE_SIGNIN_SUCCESS,
)<CognitoUserAttributes>();
export const googleSigninFailure = createAction(
  ACTIONS.GOOGLE_SIGNIN_FAILURE,
)<Error>();

export const facebookSigninRequest = createAction(
  ACTIONS.FACEBOOK_SIGNIN_REQUEST,
)();

export const facebookSigninSuccess = createAction(
  ACTIONS.FACEBOOK_SIGNIN_SUCCESS,
)<CognitoUserAttributes>();
export const facebookSigninFailure = createAction(
  ACTIONS.FACEBOOK_SIGNIN_FAILURE,
)<Error>();

export const inAppBrowserCancelOperation = createAction(
  ACTIONS.IN_APP_BROWSER_CANCEL_OPERATION,
)();
export const inAppBrowserSuccessOperation = createAction(
  ACTIONS.IN_APP_BROWSER_SUCCESS_OPERATION,
)();

interface IAuth {
  email: string;
  userAttributes: CognitoUserAttributes | null;
}

const defaultState: IAuth = {
  email: '',
  userAttributes: null,
};

const actions = {
  signInRequest,
  signInSuccess,
  signInFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  confirmNewPasswordRequest,
  confirmNewPasswordSuccess,
  confirmNewPasswordFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
  resendSignUpCodeRequest,
  resendSignUpCodeSuccess,
  resendSignUpCodeFailure,
  setUserAuthData,
  clearUserAuthData,
  signOutSuccess,
  deleteUserSuccess,
  googleSigninSuccess,
};

type Actions = ActionType<typeof actions>;

export const authenticationReducer = createReducer<IAuth, Actions>(defaultState)
  .handleAction(
    actions.signInSuccess,
    (state, {payload: {email, userAttributes}}) => {
      return {
        ...state,
        email,
        userAttributes: userAttributes,
      };
    },
  )
  .handleAction(
    [actions.forgotPasswordSuccess, actions.forgotPasswordFailure],
    state => {
      return {
        ...state,
      };
    },
  )

  .handleAction(
    [
      actions.clearUserAuthData,
      actions.signOutSuccess,
      actions.deleteUserSuccess,
    ],
    state => {
      return {
        ...state,
        userAttributes: null,
      };
    },
  )

  .handleAction(
    [
      actions.setUserAuthData,
      actions.confirmSignUpSuccess,
      actions.confirmNewPasswordSuccess,
      actions.googleSigninSuccess,
    ],
    (state, {payload}) => {
      return {
        ...state,
        userAttributes: payload,
      };
    },
  );
