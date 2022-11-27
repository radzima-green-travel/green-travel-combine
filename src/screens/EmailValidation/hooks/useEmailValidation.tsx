import {useCallback, useState} from 'react';

import {useDispatch} from 'react-redux';
import {
  confirmSignUpRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
} from 'core/reducers';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  EmailValidationScreenNavigationProps,
  EmailValidationScreenRouteProps,
} from '../types';

export const useEmailValidation = () => {
  const {t} = useTranslation('authentification');
  const [isCodeFull, setIsCodeFull] = useState(false);
  const [code, setCode] = useState('');

  const navigation = useNavigation<EmailValidationScreenNavigationProps>();
  const {
    params: {email, isSignUp},
  } = useRoute<EmailValidationScreenRouteProps>();

  const dispatch = useDispatch();

  const getEmailCode = (emailCode, isCode) => {
    setIsCodeFull(isCode);
    setCode(emailCode);
  };

  const {loading} = useRequestLoading(confirmSignUpRequest);

  const onConfirmSignUp = useCallback(() => {
    if (isSignUp) {
      dispatch(confirmSignUpRequest({email, code}));
    } else {
      navigation.navigate('NewPassword', {email, code});
    }
  }, [isSignUp, dispatch, email, code, navigation]);

  const onResendSignUpCodetoEmail = useCallback(() => {
    dispatch(resendSignUpCodeRequest(email));
  }, [dispatch, email]);

  const onResendRestorePasswordCodetoEmail = useCallback(() => {
    dispatch(forgotPasswordRequest({email}));
  }, [dispatch, email]);

  const buttonText = t('ready').toUpperCase();

  useOnRequestSuccess(confirmSignUpRequest, () => {
    navigation.getParent()?.goBack();
  });

  return {
    isSignUp,
    email,
    onConfirmSignUp,
    isCodeFull,
    loading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    getEmailCode,
    buttonText,
  };
};
