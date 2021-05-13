import {nativeClientApi} from './nativeClientApi';
import {
  IGetHomeDataResponse,
  IGetHomeDataAvailabilityResponse,
} from 'core/types';
import graphQLQuery from './graphQLQuery';
import graphQLQueryUpdatesAvailability from './graphQLQueryUpdatesAvailability';

export function getCategories(): Promise<IGetHomeDataResponse> {
  return nativeClientApi.post('', {query: graphQLQuery});
}

export function getUpdatesAvailability(): Promise<
  IGetHomeDataAvailabilityResponse
> {
  return nativeClientApi.post('', {query: graphQLQueryUpdatesAvailability});
}
