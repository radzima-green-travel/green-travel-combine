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
