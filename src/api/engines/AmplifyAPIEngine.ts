import {API} from 'aws-amplify';
import {
  RequestError,
  createAmplifyErrorPreset,
  createInternetConnectionErrorPreset,
} from 'core/errors';
import {AmplifyError, AmplifyErrorPresetParams} from 'core/types';

export interface CustomApiRequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string | number>;
  body?: any;
}

export class AmplifyApiEngine {
  async getHeaders(_config?: CustomApiRequestConfig) {
    return {};
  }

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

  async getByApi(apiName: string, path: string, params?: Record<string, any>) {
    return API.get(apiName, path, {
      headers: await this.getHeaders(),
      queryStringParameters: params,
    });
  }

  async postByApi(
    apiName: string,
    path: string,
    config?: CustomApiRequestConfig,
  ) {
    return API.post(apiName, path, {
      body: config?.body,
      headers: await this.getHeaders(config),
    });
  }

  async deleteByApi(
    apiName: string,
    path: string,
    params?: Record<string, any>,
  ) {
    return API.del(apiName, path, {
      headers: await this.getHeaders(),
      queryStringParameters: params,
    });
  }
}
