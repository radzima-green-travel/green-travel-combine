import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {HomeScreenNavigationProps} from '../types';
import {useHomeAnalytics} from './useHomeAnalytics';

export const usePlacesYouWontFindWidget = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const {sendMainScreenNonGMObjectsViewEvent} = useHomeAnalytics();

  const openPlacesPage = useCallback(() => {
    navigation.navigate('ObjectsList', {
      title: 'home:placesYouWontFindPageTitle',
      appliedFilters: {markedAsNotOnGoogleMaps: true},
      showsTitle: true,
    });
    sendMainScreenNonGMObjectsViewEvent();
  }, [navigation, sendMainScreenNonGMObjectsViewEvent]);
  return {
    openPlacesPage,
  };
};
