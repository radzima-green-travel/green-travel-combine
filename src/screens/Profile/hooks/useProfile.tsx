import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from '../types';
import {useSelector} from 'react-redux';
import {selectUserAuthorized, selectUserEmail} from 'core/selectors';
import {useRequestLoading} from 'react-redux-help-kit';
import {googleSigninRequest} from 'core/reducers';

export const useProfile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const isAuthorized = useSelector(selectUserAuthorized);

  const onAuthorisationItemPress = useCallback(() => {
    if (isAuthorized) {
      navigation.navigate('ProfileDetails');
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
      });
    }
  }, [isAuthorized, navigation]);

  const navigateToProfileSettingsLanguage = useCallback(() => {
    navigation.navigate('ProfileSettingsLanguage');
  }, [navigation]);

  const navigateToProfileSettingsTheme = useCallback(() => {
    navigation.navigate('ProfileSettingsTheme');
  }, [navigation]);

  const userEmail = useSelector(selectUserEmail);

  const {loading} = useRequestLoading(googleSigninRequest);

  return {
    userEmail,
    isAuthorized,
    onAuthorisationItemPress,
    navigateToProfileSettingsLanguage,
    navigateToProfileSettingsTheme,
    loading,
  };
};
