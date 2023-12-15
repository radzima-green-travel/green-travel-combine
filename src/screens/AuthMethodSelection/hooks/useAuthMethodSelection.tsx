import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthMethodSelectionScreenNavigationProps} from '../types';

import {useDispatch} from 'react-redux';
import {signInRequest} from 'core/reducers';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {
  useNavigateToPrivacyPolicyAndTnC,
  useOnSuccessSignIn,
} from 'core/hooks';

export const useAuthMethodSelection = () => {
  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();
  const dispatch = useDispatch();

  const {navigateToPrivacyPolicy, navigateToTermsAndConditions} =
    useNavigateToPrivacyPolicyAndTnC();

  const {onSuccessSignIn} = useOnSuccessSignIn();

  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('CheckEmail');
  }, [navigation]);

  const handleGoogleButtonPress = () => {
    dispatch(
      signInRequest({socialProvider: CognitoHostedUIIdentityProvider.Google}),
    );
  };
  const handleFacebookButtonPress = () => {
    dispatch(
      signInRequest({socialProvider: CognitoHostedUIIdentityProvider.Facebook}),
    );
  };
  const handleAppleButtonPress = () => {
    dispatch(
      signInRequest({socialProvider: CognitoHostedUIIdentityProvider.Apple}),
    );
  };

  useOnRequestSuccess(signInRequest, onSuccessSignIn);

  const {getLoadingStateByEntityId} = useRequestLoading(signInRequest);

  return {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
    googleLoading: getLoadingStateByEntityId(
      CognitoHostedUIIdentityProvider.Google,
    ),
    facebookLoading: getLoadingStateByEntityId(
      CognitoHostedUIIdentityProvider.Facebook,
    ),
    appleLoading: getLoadingStateByEntityId(
      CognitoHostedUIIdentityProvider.Apple,
    ),
    navigateToPrivacyPolicy,
    navigateToTermsAndConditions,
  };
};
