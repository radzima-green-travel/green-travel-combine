import {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthMethodSelectionScreenNavigationProps} from '../types';
import {socialSignInRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Auth, Hub} from 'aws-amplify';

export const useAuthMethodSelection = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<AuthMethodSelectionScreenNavigationProps>();

  const handleEmailButtonPress = useCallback(() => {
    navigation.navigate('AuthNavigator', {
      screen: 'CheckEmail',
    });
  }, [navigation]);

  const handleGoogleButtonPress = useCallback(() => {
    dispatch(socialSignInRequest(CognitoHostedUIIdentityProvider.Google));
  }, [dispatch]);

  const handleFacebookButtonPress = useCallback(() => {
    dispatch(socialSignInRequest(CognitoHostedUIIdentityProvider.Facebook));
  }, [dispatch]);

  const handleAppleButtonPress = useCallback(() => {
    dispatch(socialSignInRequest(CognitoHostedUIIdentityProvider.Apple));
  }, [dispatch]);

  // TODO: recheck if it's possible to receive the response without Hub
  // example logic from the documentation
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({payload: {event, data}}) => {
      console.log('listen');

      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, []);

  return {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
  };
};
