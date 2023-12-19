import React from 'react';

import {FormInput, SnackBar, WithFormikInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useRestorePassword} from './hooks';
import {useTranslation} from 'react-i18next';
import {FormikProvider} from 'formik';
import {TestIDs} from 'core/types';

export const RestorePassword = () => {
  const {t} = useTranslation('authentification');
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
        title={t('restorePassword')}
        text={t('restorePasswordInstruction')}
        onSubmitPress={submitForm}
        submitButtonText={buttonText}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}
        secondaryButtonText={t('returnAndEnter')}
        onSecondaryButtonPress={navigateToSignIn}>
        <WithFormikInput<string> name="email">
          {({messageText, ...inputProps}) => (
            <FormInput
              testID={TestIDs.EmailInput}
              autoFocus
              label={t('email')}
              keyboardType="email-address"
              messageText={messageText ? t(messageText) : undefined}
              {...inputProps}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};
