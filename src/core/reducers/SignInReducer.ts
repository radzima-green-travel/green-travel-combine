import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';

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

export interface ISignIn {
  email: string;
  forgotPasswordFinished: boolean;
  confirmNewPasswordFinished: boolean;
}

const defaultState: ISignIn = {
  email: '',
  forgotPasswordFinished: false,
  confirmNewPasswordFinished: false,
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
};

type Actions = ActionType<typeof actions>;

export const signInReducer = createReducer<ISignIn, Actions>(defaultState)
  .handleAction(actions.signInSuccess, (state, {payload: {email}}) => {
    return {
      ...defaultState,
      email,
    };
  })
  .handleAction(
    [actions.forgotPasswordSuccess, actions.forgotPasswordFailure],
    () => {
      return {
        ...defaultState,
        forgotPasswordFinished: true,
      };
    },
  )
  .handleAction(
    [actions.confirmNewPasswordSuccess, actions.confirmNewPasswordFailure],
    () => {
      return {
        ...defaultState,
        confirmNewPasswordFinished: true,
      };
    },
  );
