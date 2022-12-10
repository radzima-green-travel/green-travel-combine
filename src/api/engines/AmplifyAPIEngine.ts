import {
  RequestError,
  createAmplifyErrorPreset,
  createInternetConnectionErrorPreset,
} from 'core/errors';
import {AmplifyError, AmplifyErrorPresetParams} from 'core/types';

export class AmplifyApiEngine {
  async invoke<A extends any[], T extends (...args: A) => ReturnType<T>>(
    {
      context,
      method,
      errorMap,
    }: {
      context: any;
      method: T;
      errorMap: (e: AmplifyError) => Partial<AmplifyErrorPresetParams>;
    },
    ...args: A
  ): Promise<ReturnType<T>> {
    try {
      const res = await method.apply(context, args);
      return res;
    } catch (e) {
      const amplifyError = e as AmplifyError;

      if (amplifyError.code === 'NetworkError') {
        return Promise.reject(
          new RequestError(
            createInternetConnectionErrorPreset(amplifyError.message),
          ),
        );
      }
      const customError = new RequestError(
        createAmplifyErrorPreset({
          message: amplifyError.message,
          code: 'UNKNOWN_ERROR',
          status: 0,
          methodName: method.name,
          ...(errorMap(amplifyError) || {}),
        }),
      );
      return Promise.reject(customError);
    }
  }
}
