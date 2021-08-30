import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {getEtagsFromStorage, setEtagsToStorage} from 'storage';

let isAppJustLaunched = true;

let etagsCache = {};

const getCacheKey = (config: AxiosRequestConfig) =>
  config.baseURL || '' + config.url || '';

export const etagCachingRequestInterceptor = async (
  request: AxiosRequestConfig,
) => {
  const cacheKey = getCacheKey(request);
  if (isAppJustLaunched) {
    isAppJustLaunched = false;
    const etagsFromStorage = await getEtagsFromStorage();
    if (etagsFromStorage) {
      etagsCache = {...etagsCache, ...etagsFromStorage};
    }
  }
  const etag = etagsCache[cacheKey];
  if (etag) {
    request.headers['If-None-Match'] = etag;
  }

  return request;
};

export const etagCachingRespnseInterceptor = (response: AxiosResponse<any>) => {
  const etag = response.headers.etag;
  if (etag) {
    const cacheKey = getCacheKey(response.config);
    etagsCache[cacheKey] = etag;
  }

  return response;
};

export function saveLocalEtagsToStorage() {
  return setEtagsToStorage(etagsCache);
}
