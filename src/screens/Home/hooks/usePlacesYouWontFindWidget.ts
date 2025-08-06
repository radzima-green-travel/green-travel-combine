import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {HomeScreenNavigationProps} from '../types';
import {useTranslation} from 'core/hooks';
import {useHomeAnalytics} from './useHomeAnalytics';

export const usePlacesYouWontFindWidget = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const {sendMainScreenNonGMObjectsViewEvent} = useHomeAnalytics();

  const {t} = useTranslation('home');
  const openPlacesPage = useCallback(() => {
    navigation.navigate('ObjectsList', {
      title: t('placesYouWontFindPageTitle'),
      appliedFilters: {markedAsNotOnGoogleMaps: true},
    });
    sendMainScreenNonGMObjectsViewEvent();
  }, [navigation, sendMainScreenNonGMObjectsViewEvent, t]);
  return {
    openPlacesPage,
  };
};
