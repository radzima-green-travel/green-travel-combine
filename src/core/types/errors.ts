export type RequestErrorCodes =
  | 'ERROR_LOCATION_PERMISSION_DENIED'
  | 'ERROR_NETWORK_ERROR'
  | 'UNKNOWN_ERROR'
  | 'PASSWORD_RESET_REQUIRED'
  | 'USER_NOT_CONFIRMED'
  | 'NOT_AUTHORIZED'
  | 'USER_NOT_FOUND'
  | 'PASSWORD_ATTEMPTS_EXCEEDED'
  | 'USER_TO_RESTORE_NOT_FOUND'
  | 'VERIFICATION_CODE_MISMATCH'
  | 'VERIFICATION_CODE_CONFIRMATION_ATTEMPTS_EXCEEDED'
  | 'SOCILAL_LOGIN_CANCELLED'
  | 'SOCIAL_LOGIN_ERROR'
  | 'SOCIAL_LOGOUT_ERROR'
  | 'SOCILAL_LOGOUT_CANCELLED'
  | 'SIGNUP_CANCELED'
  | 'WRONG_PASSWORD';

export interface IRequestError extends Error {
  timestamp: number;
  path: string;
  status: number;
  message: string;
  error_code: RequestErrorCodes;
  requestId: string;
  error: string;
}

export type ErrorPresetParams = {
  message: string;
  methodName: string;
  status: number;
  code: RequestErrorCodes;
};
