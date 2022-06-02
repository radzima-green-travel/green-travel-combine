import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';

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

export interface ISignUp {
  signUpFinished: boolean;
  signUpConfirmFinished: boolean;
  resendSignUpCode: boolean;
}

const defaultState: ISignUp = {
  signUpFinished: false,
  signUpConfirmFinished: false,
  resendSignUpCode: false,
};

const actions = {
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

export const signUpReducer = createReducer<ISignUp, Actions>(defaultState)
  .handleAction([actions.signUpSuccess, actions.signUpFailure], () => {
    return {
      ...defaultState,
      signUpFinished: true,
    };
  })
  .handleAction(
    [actions.confirmSignUpSuccess, actions.confirmSignUpFailure],
    () => {
      return {
        ...defaultState,
        signUpFinished: true,
        signUpConfirmFinished: true,
      };
    },
  )
  .handleAction(
    [actions.resendSignUpCodeSuccess, actions.resendSignUpCodeFailure],
    () => {
      return {
        ...defaultState,
        resendSignUpCode: true,
      };
    },
  );
