import {useCallback, useState} from 'react';

import {
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
} from 'core/hooks';
import {signInRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SignInPasswordScreenNavigationProps,
  SignInPasswordScreenRouteProps,
} from '../types';

export const useSignInPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SignInPasswordScreenNavigationProps>();

  const {
    params: {email},
  } = useRoute<SignInPasswordScreenRouteProps>();
  const [password, setPassword] = useState('');

  const navigateToRestorePassword = useCallback(() => {
    navigation.navigate('RestorePassword');
  }, [navigation]);

  const signIn = useCallback(() => {
    dispatch(signInRequest({email, password}));
  }, [dispatch, email, password]);

  const {loading} = useRequestLoading(signInRequest);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  useOnRequestSuccess(signInRequest, () => {
    navigation.getParent()?.goBack();
  });

  return {
    email,
    signIn,
    loading,
    navigateToRestorePassword,
    password,
    setPassword,
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
