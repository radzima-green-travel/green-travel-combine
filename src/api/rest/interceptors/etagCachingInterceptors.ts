import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {
  getEtagsFromStorage,
  setEtagsToStorage,
  resetEtagsStorage,
} from 'storage';

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
    request.headers = {...request.headers, 'if-none-match': etag};
  }

  return request;
};

export const etagCachingRespnseInterceptor = (response: AxiosResponse<any>) => {
  const etag = response.headers.etag;

  if (etag) {
    const cacheKey = getCacheKey(response.config);
    const prevEtag = etagsCache[cacheKey];
    etagsCache[cacheKey] = etag;

    if (prevEtag && prevEtag === etag) {
      response.data = null;
    }
  }

  return response;
};

export function saveLocalEtagsToStorage() {
  return setEtagsToStorage(etagsCache);
}

export function resetEtags() {
  etagsCache = {};
  return resetEtagsStorage();
}
