import React from 'react';

import {confirmSignUpRequest} from 'core/reducers';
import {useOnRequestSuccess} from 'core/hooks';
import {AuthForm} from 'organisms';
import {OneTimeCode} from 'atoms';
import {useEmailValidation} from './hooks';

export const EmailValidation = () => {
  const {
    t,
    navigation,
    isSignUp,
    email,
    onConfirmSignUp,
    buttonText,
    isCodeFull,
    loading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    getEmailCode,
  } = useEmailValidation();

  useOnRequestSuccess(confirmSignUpRequest, () => {
    navigation.getParent()?.goBack();
  });

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
