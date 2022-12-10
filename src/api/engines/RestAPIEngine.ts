import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {provideCustomError} from './interceptors';

export class RestApiEngine {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: this.getHeaders(),
      validateStatus: status => status < 400,
    });

    this.applyInterceptors();
  }

  applyInterceptors() {
    this.axiosInstance.interceptors.response.use(
      response => response,
      provideCustomError,
    );
  }

  protected getHeaders() {
    return {};
  }

  public async get(path: string, config?: AxiosRequestConfig) {
    const result = await this.axiosInstance.get(path, config);
    return result.data;
  }

  public async post(path: string, data: any, config?: AxiosRequestConfig) {
    const result = await this.axiosInstance.post(path, data, config);
    return result.data;
  }

  public async put(path: string, data: any, config?: AxiosRequestConfig) {
    const result = await this.axiosInstance.put(path, data, config);
    return result.data;
  }

  public async remove(path: string, config?: AxiosRequestConfig) {
    const result = await this.axiosInstance.delete(path, config);
    return result.data;
  }
}
