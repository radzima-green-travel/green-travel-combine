import {RequestErrorCodes, AmplifyErrorPresetParams} from 'core/types';

export const createPermissionErrorPreset = (path: string, message: string) => ({
  message: message,
  timestamp: Date.now(),
  status: -2,
  error_code: 'ERROR_LOCATION_PERMISSION_DENIED' as RequestErrorCodes,
  path: path,
  requestId: '',
  error: message,
});

export const createInternetConnectionErrorPreset = (message: string) => ({
  message: message,
  timestamp: Date.now(),
  status: -1,
  error_code: 'ERROR_NETWORK_ERROR' as RequestErrorCodes,
  error: message,
  path: '',
  requestId: '',
});

export const createAmplifyErrorPreset = ({
  message,
  methodName,
  status,
  code,
}: AmplifyErrorPresetParams) => ({
  message: message,
  timestamp: Date.now(),
  status: status,
  error_code: code,
  error: message,
  path: `amplify/${methodName}`,
  requestId: '',
});

export const createSocialLoginCancelErrorPreset = () => ({
  message: 'Social login cancelled',
  timestamp: Date.now(),
  status: -3,
  error_code: 'SOCILAL_LOGIN_CANCELLED' as RequestErrorCodes,
  error: 'Social login cancelled',
  path: '',
  requestId: '',
});

export const createSocialLoginErrorPreset = () => ({
  message: 'Social login error',
  timestamp: Date.now(),
  status: -3,
  error_code: 'SOCIAL_LOGIN_ERROR' as RequestErrorCodes,
  error: 'Social login error',
  path: '',
  requestId: '',
});

export const createSocialLogoutErrorPreset = () => ({
  message: 'Social logout error',
  timestamp: Date.now(),
  status: -3,
  error_code: 'SOCIAL_LOGOUT_ERROR' as RequestErrorCodes,
  error: 'Social logout error',
  path: '',
  requestId: '',
});
