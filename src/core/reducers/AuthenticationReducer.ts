import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';
import {CognitoUser} from '@aws-amplify/auth';

export const signInRequest = createAction(ACTIONS.SIGNIN_REQUEST)<{
  email: string;
  password: string;
}>();
export const signInSuccess = createAction(ACTIONS.SIGNIN_SUCCESS)<{
  email: string;
}>();
export const signInFailure = createAction(ACTIONS.SIGNIN_FAILURE)<Error>();

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
  code: string;
  newPassword: string;
}>();
export const confirmNewPasswordSuccess = createAction(
  ACTIONS.CONFIRM_NEW_PASSWORD_SUCCESS,
)();
export const confirmNewPasswordFailure = createAction(
  ACTIONS.CONFIRM_NEW_PASSWORD_FAILURE,
)<Error>();

export const userAuthorizedRequest = createAction(
  ACTIONS.USER_AUTHORIZED_REQUEST,
)();
export const userAuthorizedSuccess = createAction(
  ACTIONS.USER_AUTHORIZED_SUCCESS,
)<{
  userAuthorized: CognitoUser;
}>();
export const userAuthorizedFailure = createAction(
  ACTIONS.USER_AUTHORIZED_FAILURE,
)<Error>();

export const signUpRequest = createAction(ACTIONS.SIGNUP_REQUEST)<{
  username: string;
  password: string;
  attributes: {
    name: string;
    family_name: string;
  };
}>();
export const signUpSuccess = createAction(ACTIONS.SIGNUP_SUCCESS)();
export const signUpFailure = createAction(ACTIONS.SIGNUP_FAILURE)<Error>();

export const confirmSignUpRequest = createAction(
  ACTIONS.CONFIRM_SIGNUP_REQUEST,
)<{
  email: string;
  code: string;
}>();
export const confirmSignUpSuccess = createAction(
  ACTIONS.CONFIRM_SIGNUP_SUCCESS,
)();
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

interface IAuth {
  email: string;
  userAuthorized: CognitoUser | null | undefined;
}

const defaultState: IAuth = {
  email: '',
  userAuthorized: undefined,
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
  userAuthorizedRequest,
  userAuthorizedSuccess,
  userAuthorizedFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
  resendSignUpCodeRequest,
  resendSignUpCodeSuccess,
  resendSignUpCodeFailure,
};

type Actions = ActionType<typeof actions>;

export const authenticationReducer = createReducer<IAuth, Actions>(defaultState)
  .handleAction(actions.signInSuccess, (state, {payload: {email}}) => {
    return {
      ...state,
      email,
    };
  })
  .handleAction(
    [actions.forgotPasswordSuccess, actions.forgotPasswordFailure],
    state => {
      return {
        ...state,
      };
    },
  )
  .handleAction(
    [actions.confirmNewPasswordSuccess, actions.confirmNewPasswordFailure],
    state => {
      return {
        ...state,
        userAuthorized: undefined,
      };
    },
  )
  .handleAction(actions.confirmSignUpSuccess, (state) => {
    return {
      ...state,
      userAuthorized: undefined,
    };
  })
  .handleAction(
    actions.userAuthorizedSuccess,
    (state, {payload: {userAuthorized}}) => {
      return {
        ...state,
        userAuthorized: userAuthorized ?? null,
      };
    },
  )
  .handleAction(actions.userAuthorizedFailure, () => {
    return {
      ...defaultState,
      userAuthorized: null,
    };
  });
