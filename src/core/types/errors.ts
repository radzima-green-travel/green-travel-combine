export type RequestErrorCodes =
  | 'ERROR_LOCATION_PERMISSION_DENIED'
  | 'ERROR_NETWORK_ERROR'
  | 'UNKNOWN_ERROR'
  | 'PASSWORD_RESET_REQUIRED'
  | 'USER_NOT_CONFIRMED'
  | 'NOT_AUTHORIZED'
  | 'USER_NOT_FOUND';

export interface IRequestError extends Error {
  timestamp: number;
  path: string;
  status: number;
  message: string;
  error_code: RequestErrorCodes;
  requestId: string;
  error: string;
}

export type AmplifyErrorPresetParams = {
  message: string;
  methodName: string;
  status: number;
  code: RequestErrorCodes;
};
