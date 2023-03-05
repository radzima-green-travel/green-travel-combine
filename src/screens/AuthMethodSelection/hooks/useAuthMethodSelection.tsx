import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthMethodSelectionScreenNavigationProps} from '../types';

import {useDispatch} from 'react-redux';
import {googleSigninRequest} from 'core/reducers';

export const useAuthMethodSelection = () => {
  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();
  const dispatch = useDispatch();
  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('CheckEmail');
  }, [navigation]);

  const handleGoogleButtonPress = () => {
    dispatch(googleSigninRequest());
  };
  const handleFacebookButtonPress = () => {};
  const handleAppleButtonPress = () => {};

  return {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
  };
};
