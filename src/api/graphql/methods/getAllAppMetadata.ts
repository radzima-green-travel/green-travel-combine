import {listMobileMetadata} from '../customQueries';
import {amplifyApiService} from 'services/AmplifyApiService';

export function getAllAppMetadata() {
  return amplifyApiService.query(listMobileMetadata);
}
