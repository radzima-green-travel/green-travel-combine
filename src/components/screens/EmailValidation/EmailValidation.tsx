import React, {useCallback, useState} from 'react';

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
import {AuthForm} from 'organisms';
import {OneTimeCode} from 'atoms';
import {IProps} from './types';

export const EmailValidation = ({navigation, route}: IProps) => {
  const [isCodeFull, setIsCodeFull] = useState(false);
  const [code, setCode] = useState('');
  const {t} = useTranslation('authentification');

  const buttonText = t('ready').toUpperCase();

  const dispatch = useDispatch();

  const {
    params: {email, isSignUp},
  } = route;

  const getEmailCode = (emailCode, isCode) => {
    setIsCodeFull(isCode);
    setCode(emailCode);
  };

  const {loading} = useRequestLoading(confirmSignUpRequest);

  useOnRequestSuccess(confirmSignUpRequest, () => {
    navigation.getParent()?.goBack();
  });

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

  return (
    <AuthForm
      title={isSignUp ? t('signUpValidationTitle') : t('emailValidationTitle')}
      text={t('signUpValidationText') + ' ' + email}
      onSubmitPress={onConfirmSignUp}
      submitButtonText={buttonText}
      isSubmitButtonDisabled={!isCodeFull}
      submitButtonLoading={loading}
      onSecondaryButtonPress={
        isSignUp
          ? onResendSignUpCodetoEmail
          : onResendRestorePasswordCodetoEmail
      }
      secondaryButtonText={t('repeatAttempt')}>
      <OneTimeCode onCodeInput={getEmailCode} />
    </AuthForm>
  );
};
