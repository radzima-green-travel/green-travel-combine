import {getListMobileData} from '../customQueries';
import {ListMobileDataQuery} from '../types';
import {concat} from 'lodash';
import {amplifyApiService} from 'services/AmplifyApiService';
import {SupportedLocales} from 'core/types';

export async function getAllAppData({
  nextToken,
  locale,
}: {
  nextToken?: string;
  locale: SupportedLocales;
}): Promise<ListMobileDataQuery> {
  const data = await amplifyApiService.query<ListMobileDataQuery>(
    getListMobileData(locale),
    {
      nextToken: nextToken,
      filter: {
        locale: locale,
      },
    },
  );

  const listMobileData = data?.listMobileData;
  if (listMobileData?.objects?.nextToken) {
    const nextData = await getAllAppData({
      nextToken: listMobileData.objects.nextToken,
      locale,
    });
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
