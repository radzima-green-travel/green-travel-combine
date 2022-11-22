import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from '../types';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from '../styles';
import {useSelector} from 'react-redux';
import {selectUserAuthorized, selectUserEmail} from 'core/selectors';

export const useProfile = () => {
  const styles = useThemeStyles(themeStyles);
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const {t} = useTranslation('profile');
  const isAuthorized = useSelector(selectUserAuthorized);
  const userEmail = useSelector(selectUserEmail);

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
    t,
    styles,
    onAuthorisationItemPress,
    navigateToProfileSettingsTheme,
    isAuthorized,
    userEmail,
  };
};
