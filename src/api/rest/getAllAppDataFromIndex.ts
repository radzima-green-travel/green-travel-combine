import {restApi} from './restApi';
import {SupportedLocales} from 'core/types';
import {ListMobileDataQuery} from '../graphql/types';

export async function getAllAppDataFromIndex({
  locale,
}: {
  locale: SupportedLocales;
}): Promise<ListMobileDataQuery | null> {
  const data = await restApi.get(`/objects_v1_${locale}.json`);

  if (!data) {
    return null;
  }

  return {listMobileData: data};
}
