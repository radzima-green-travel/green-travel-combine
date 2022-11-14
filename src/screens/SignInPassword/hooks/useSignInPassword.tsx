import {useCallback, useState} from 'react';

import {
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
  useTranslation,
} from 'core/hooks';
import {signInRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SignInPasswordScreenNavigationProps,
  SignInPasswordScreenRouteProps,
} from '../types';

export const useSignInPassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();
  const navigation = useNavigation<SignInPasswordScreenNavigationProps>();

  const {
    params: {email},
  } = useRoute<SignInPasswordScreenRouteProps>();
  const [password, setPassword] = useState('');

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  const navigateToRestorePassword = useCallback(() => {
    navigation.navigate('RestorePassword');
  }, [navigation]);

  const signIn = useCallback(() => {
    dispatch(signInRequest({email, password}));
  }, [dispatch, email, password]);

  const {loading} = useRequestLoading(signInRequest);
  useOnRequestSuccess(signInRequest, () => {
    navigation.getParent()?.goBack();
  });

  return {
    t,
    email,
    signIn,
    loading,
    navigateToRestorePassword,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
    password,
    setPassword,
  };
};
