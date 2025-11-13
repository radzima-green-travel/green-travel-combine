import React from 'react';
import { useTranslation } from 'core/hooks';
import { FormInput, SnackBar, WithFormikInput } from 'atoms';
import { AuthForm } from 'organisms';
import { useCheckEmail } from './hooks';
import { FormikProvider } from 'formik';

export const CheckEmail = () => {
  const { t } = useTranslation('authentification');
  const { loading, formik, snackBarProps, isSubmitButtonDisabled, submitForm } =
    useCheckEmail();
  return (
    <FormikProvider value={formik}>
      <AuthForm
        title={t('enterEmailAddress')}
        text={t('checkAccount')}
        onSubmitPress={submitForm}
        submitButtonText={t('check')}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        testID="authForm"
        submitButtonLoading={loading}>
        <WithFormikInput<string> name="email">
          {({ messageText, ...inputProps }) => (
            <FormInput
              testID={'emailInput'}
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
