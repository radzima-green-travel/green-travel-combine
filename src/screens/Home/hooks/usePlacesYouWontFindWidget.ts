import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {HomeScreenNavigationProps} from '../types';
import {useTranslation} from 'core/hooks';

export const usePlacesYouWontFindWidget = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const {t} = useTranslation('home');

  return useCallback(
    () =>
      navigation.navigate('ObjectsList', {
        title: t('placesYouWontFindPageTitle'),
        markedAsNotOnGoogleMaps: true,
      }),
    [navigation, t],
  );
};
