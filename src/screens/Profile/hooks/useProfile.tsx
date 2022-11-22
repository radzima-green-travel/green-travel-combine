import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from '../types';
import {useSelector} from 'react-redux';
import {selectUserAuthorized} from 'core/selectors';

export const useProfile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const isAuthorized = useSelector(selectUserAuthorized);

  const onAuthorisationItemPress = useCallback(() => {
    if (isAuthorized) {
      navigation.navigate('ProfileDetails');
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'CheckEmail',
      });
    }
  }, [isAuthorized, navigation]);

  const navigateToProfileSettingsTheme = useCallback(() => {
    navigation.navigate('ProfileSettingsTheme');
  }, [navigation]);

  return {
    isAuthorized,
    onAuthorisationItemPress,
    navigateToProfileSettingsTheme,
  };
};
