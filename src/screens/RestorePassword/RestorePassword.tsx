import React from 'react';

import { FormInput, SnackBar, WithFormikInput } from 'atoms';
import { AuthForm } from 'organisms';
import { useRestorePassword } from './hooks';
import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';

export const RestorePassword = () => {
  const { t } = useTranslation('authentification');
  const {
    loading,
    navigateToSignIn,
    buttonText,
    formik,
    isSubmitButtonDisabled,
    submitForm,
    snackBarProps,
  } = useRestorePassword();

  return (
    <FormikProvider value={formik}>
      <AuthForm
        testID="authForm"
        title={t('restorePassword')}
        text={t('restorePasswordInstruction')}
        onSubmitPress={submitForm}
        submitButtonText={buttonText}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}
        secondaryButtonText={t('returnAndEnter')}
        onSecondaryButtonPress={navigateToSignIn}>
        <WithFormikInput<string> name="email">
          {({ messageText, ...inputProps }) => (
            <FormInput
              testID={'emailFormInput'}
              autoFocus
              label={t('email')}
              keyboardType="email-address"
              messageText={messageText ? t(messageText) : undefined}
              {...inputProps}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};
