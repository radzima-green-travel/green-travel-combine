import React from 'react';

import { useTranslation } from 'core/hooks';
import { AuthForm } from 'organisms';
import { OneTimeCode, SnackBar, WithFormikInput } from 'atoms';
import { useEmailValidation } from './hooks';
import { FormikProvider } from 'formik';

export const EmailValidation = () => {
  const { t } = useTranslation('authentification');
  const {
    isSignUp,
    email,
    loading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    buttonText,
    formik,
    isSubmitButtonDisabled,
    submitForm,
    snackBarProps,
    codeLength,
    seconadaryLoading,
  } = useEmailValidation();

  return (
    <FormikProvider value={formik}>
      <AuthForm
        title={
          isSignUp ? t('signUpValidationTitle') : t('emailValidationTitle')
        }
        text={t('signUpValidationText') + ' ' + email}
        onSubmitPress={submitForm}
        submitButtonText={buttonText}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}
        testID="authForm"
        secondaryButtonLoading={seconadaryLoading}
        onSecondaryButtonPress={
          isSignUp
            ? onResendSignUpCodetoEmail
            : onResendRestorePasswordCodetoEmail
        }
        secondaryButtonText={t('repeatAttempt')}>
        <WithFormikInput<string> name="code">
          {({ messageText, ...inputProps }) => (
            <OneTimeCode
              testID="codeInput"
              autoFocus
              messageText={messageText ? t(messageText) : undefined}
              codeLength={codeLength}
              {...inputProps}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};
