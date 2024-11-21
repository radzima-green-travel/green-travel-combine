import {RequestErrorCodes, ErrorPresetParams} from 'core/types';

export const createLocationErrorPreset = () => ({
  message: 'Unable to retrieve geolocation.',
  timestamp: Date.now(),
  status: -2,
  error_code: 'CANT_GET_LOCATION' as RequestErrorCodes,
  path: '',
  requestId: '',
  error: 'Unable to retrieve geolocation.',
});

export const createPermissionErrorPreset = (
  message: string = 'Location permission denied',
) => ({
  message: message,
  timestamp: Date.now(),
  status: -2,
  error_code: 'ERROR_LOCATION_PERMISSION_DENIED' as RequestErrorCodes,
  path: '',
  requestId: '',
  error: message,
});

export const locationPermissionCanceledErrorPreset = (
  message: string = 'Location permission canceled',
) => ({
  message: message,
  timestamp: Date.now(),
  status: -2,
  error_code: 'ERROR_LOCATION_PERMISSION_CANCELED' as RequestErrorCodes,
  path: '',
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

export const createErrorPreset = ({
  message,
  methodName,
  status,
  code,
}: ErrorPresetParams) => ({
  message: message,
  timestamp: Date.now(),
  status: status,
  error_code: code,
  error: message,
  path: methodName ? `amplify/${methodName}` : '',
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

export const createSocialLogoutCancelErrorPreset = () => ({
  message: 'Social logout cancelled',
  timestamp: Date.now(),
  status: -3,
  error_code: 'SOCILAL_LOGOUT_CANCELLED' as RequestErrorCodes,
  error: 'Social logout cancelled',
  path: '',
  requestId: '',
});

export const createSignupCancelErrorPreset = () => ({
  message: 'Signup cancelled',
  timestamp: Date.now(),
  status: -3,
  error_code: 'SIGNUP_CANCELED' as RequestErrorCodes,
  error: 'Signup cancelled',
  path: '',
  requestId: '',
});

export const createInvalidVariableErrorPreset = message => ({
  message: message,
  timestamp: Date.now(),
  status: 0,
  error_code: 'INVALID_VARIABLE' as RequestErrorCodes,
  error: 'Invalid variable',
  path: '',
  requestId: '',
});

export const createValidationErrorPreset = message => ({
  message: message,
  timestamp: Date.now(),
  status: 0,
  error_code: 'VALIDATION_ERROR' as RequestErrorCodes,
  error: 'Validation error',
  path: '',
  requestId: '',
});
