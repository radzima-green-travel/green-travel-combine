import {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useRequestLoading} from 'core/hooks';
import {useNavigation} from '@react-navigation/native';
import {forgotPasswordRequest} from 'core/reducers';
import {useOnRequestSuccess} from 'core/hooks';
import {RestorePasswordScreenNavigationProps} from '../types';

export const useRestorePassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation<RestorePasswordScreenNavigationProps>();

  const navigateToSignIn = () => {
    navigation.popToTop();
  };

  const onResendPassword = useCallback(() => {
    dispatch(forgotPasswordRequest({email}));
  }, [dispatch, email]);

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  const {loading} = useRequestLoading(forgotPasswordRequest);

  useOnRequestSuccess(forgotPasswordRequest, () => {
    navigation.navigate('EmailValidation', {email, isSignUp: false});
  });

  return {
    email,
    onResendPassword,
    isEmailCorrect,
    loading,
    navigateToSignIn,
    setEmail,
  };
};
