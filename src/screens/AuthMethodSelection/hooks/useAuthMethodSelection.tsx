import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AuthMethodSelectionScreenRouteProps,
  AuthMethodSelectionScreenNavigationProps,
} from '../types';

export const useAuthMethodSelection = () => {
  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();

  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('AuthNavigator', {
      screen: 'CheckEmail',
    });
  }, [navigation]);

  // TODO
  const handleGoogleButtonPress = () => {};
  const handleFacebookButtonPress = () => {};
  const handleAppleButtonPress = () => {};

  return {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
  };
};
