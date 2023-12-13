import {useCallback, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthMethodSelectionScreenNavigationProps,
  AuthMethodSelectionScreenRouteProps,
} from '../types';

import {useDispatch} from 'react-redux';
import {setPreparedVisitedObject, signInRequest} from 'core/reducers';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {useNavigateToPrivacyPolicyAndTnC} from 'core/hooks';

export const useAuthMethodSelection = () => {
  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();
  const {params} = useRoute<AuthMethodSelectionScreenRouteProps>();
  const dispatch = useDispatch();
  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('CheckEmail');
  }, [navigation]);

  useEffect(() => {
    const visitedObject = params?.visitedObject ?? null;

    dispatch(setPreparedVisitedObject(visitedObject));
  }, [params]);

  const {navigateToPrivacyPolicy, navigateToTermsAndConditions} =
    useNavigateToPrivacyPolicyAndTnC();

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

  useOnRequestSuccess(signInRequest, () => {
    navigation.goBack();
  });

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
