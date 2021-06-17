import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {getEtagFromStorage, setEtagToStorage} from 'storage';

let isAppJustLaunched = true;

const etagsCache = new Map();

const getCacheKey = (config: AxiosRequestConfig) =>
  config.baseURL || '' + config.url || '';

export const etagCachingRequestInterceptor = async (
  request: AxiosRequestConfig,
) => {
  const cacheKey = getCacheKey(request);
  if (isAppJustLaunched) {
    isAppJustLaunched = false;
    const etagFromStorage = await getEtagFromStorage(cacheKey);
    if (etagFromStorage) {
      etagsCache.set(cacheKey, etagFromStorage);
    }
  }
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
    setEtagToStorage({key: cacheKey, value: etag});
  }

  return response;
};
