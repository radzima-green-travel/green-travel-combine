import React from 'react';

import {useTranslation} from 'core/hooks';
import {AuthForm} from 'organisms';
import {OneTimeCode} from 'atoms';
import {useEmailValidation} from './hooks';

export const EmailValidation = () => {
  const {t} = useTranslation('authentification');
  const {
    isSignUp,
    email,
    onConfirmSignUp,
    isCodeFull,
    loading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    getEmailCode,
    buttonText,
  } = useEmailValidation();

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
