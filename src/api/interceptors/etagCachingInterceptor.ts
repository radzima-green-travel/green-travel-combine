import {AxiosResponse, AxiosRequestConfig} from 'axios';

const etagsCache = new Map();

const getCacheKey = (config: AxiosRequestConfig) =>
  config.baseURL || '' + config.url || '';

export const etagCachingRequestInterceptor = (request: AxiosRequestConfig) => {
  const cacheKey = getCacheKey(request);
  const etag = etagsCache.get(cacheKey);
  if (etag) {
    request.headers['If-None-Match'] = etag;
  }

  return request;
};

export const etagCachingRespnseInterceptor = (response: AxiosResponse<any>) => {
  const etag = response.headers.etag;
  if (etag) {
    const cacheKey = getCacheKey(response.config);
    etagsCache.set(cacheKey, etag);
  }

  return response;
};
