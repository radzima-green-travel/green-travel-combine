import {listMobileData as listMobileDataQuery} from '../queries';
import {ListMobileDataQuery} from '../types';
import {concat} from 'lodash';
import {amplifyApiService} from 'services/AmplifyApiService';

export async function getAllAppData(
  nextToken?: string,
): Promise<ListMobileDataQuery> {
  const data = await amplifyApiService.query<ListMobileDataQuery>(
    listMobileDataQuery,
    {
      nextToken: nextToken,
    },
  );

  const listMobileData = data?.listMobileData;
  if (listMobileData?.objects?.nextToken) {
    const nextData = await getAllAppData(listMobileData.objects.nextToken);
    const items = concat(
      listMobileData?.objects?.items || [],
      nextData?.listMobileData?.objects?.items || [],
    );
    return {
      listMobileData: {
        ...listMobileData,
        objects: {
          ...listMobileData.objects,
          items: items,
          nextToken: nextData?.listMobileData?.objects?.nextToken || null,
        },
      },
    };
  }

  return data!;
}
