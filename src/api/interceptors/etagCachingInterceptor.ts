import {AxiosResponse, AxiosRequestConfig} from 'axios';

const etagsCache = new Map();

export const etagCachingRequestInterceptor = (request: AxiosRequestConfig) => {
  const etag = etagsCache.get(request.url);
  if (etag) {
    request.headers['If-None-Match'] = etag;
  }

  return request;
};

export const etagCachingRespnseInterceptor = (resp: AxiosResponse<any>) => {
  const etag = resp.headers.etag;
  if (etag) {
    etagsCache.set(resp.config.url, etag);
  }

  return resp;
};
