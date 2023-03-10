import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthMethodSelectionScreenNavigationProps} from '../types';

import {useDispatch} from 'react-redux';
import {facebookSigninRequest, googleSigninRequest} from 'core/reducers';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';

export const useAuthMethodSelection = () => {
  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();
  const dispatch = useDispatch();
  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('CheckEmail');
  }, [navigation]);

  const handleGoogleButtonPress = () => {
    dispatch(googleSigninRequest());
  };
  const handleFacebookButtonPress = () => {
    dispatch(facebookSigninRequest());
  };
  const handleAppleButtonPress = () => {};

  useOnRequestSuccess(googleSigninRequest, () => {
    navigation.goBack();
  });

  const {loading: googleLoading} = useRequestLoading(googleSigninRequest);
  const {loading: facebookLoading} = useRequestLoading(facebookSigninRequest);

  return {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
    googleLoading,
    facebookLoading,
  };
};
