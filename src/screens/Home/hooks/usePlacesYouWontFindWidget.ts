import {useCallback} from 'react';
import {useTranslation} from 'core/hooks';
import {useHomeAnalytics} from './useHomeAnalytics';
import {useRouter} from 'expo-router';

export const usePlacesYouWontFindWidget = () => {
  const router = useRouter();
  const {sendMainScreenNonGMObjectsViewEvent} = useHomeAnalytics();

  const {t} = useTranslation('home');

  const openPlacesPage = useCallback(() => {
    router.navigate({
      pathname: '/object-list',
      params: {
        title: t('placesYouWontFindPageTitle'),
        markedAsNotOnGoogleMaps: 'true',
      },
    });
    sendMainScreenNonGMObjectsViewEvent();
  }, [router, sendMainScreenNonGMObjectsViewEvent, t]);

  return {
    openPlacesPage,
  };
};
