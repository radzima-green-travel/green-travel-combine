import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {NetworkError} from 'core/errors';
export class ApiService {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: this.getHeaders(),
      validateStatus: status => status < 400,
    });

    this.axiosInstance.interceptors.response.use(
      resp => resp,
      error => {
        if (error.message === 'Network Error') {
          return Promise.reject(new NetworkError(error.message));
        }

        return Promise.reject(error);
      },
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
