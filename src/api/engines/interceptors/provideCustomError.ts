import { AxiosError } from 'axios';
import { createInternetConnectionErrorPreset, RequestError } from 'core/errors';

export const provideCustomError = (error: AxiosError<any>) => {
  if (error instanceof RequestError) {
    return Promise.reject(error);
  }

  if (
    error.message === 'Network Error' ||
    error.message === 'timeout exceeded'
  ) {
    const internetConnectionError = new RequestError(
      createInternetConnectionErrorPreset(error.message),
    );

    return Promise.reject(internetConnectionError);
  }

  const data = error.response?.data;

  const requestError = new RequestError({
    message: data?.message || error.message,
    status: data?.status || error.response?.status || 0,
    error_code: data?.error_code || '',
    error: data?.error || error.message,
    timestamp: data?.timestamp || 0,
    requestId: data?.requestId || '',
    path: data?.path || '',
  });

  return Promise.reject(requestError);
};
