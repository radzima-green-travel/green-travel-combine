import React from 'react';

import {FormInput, SnackBar, WithFormikInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useSignInPassword} from './hooks';
import {useTranslation} from 'react-i18next';
import {FormikProvider} from 'formik';

export const SignInPassword = () => {
  const {t} = useTranslation('authentification');
  const {
    email,
    loading,
    navigateToRestorePassword,
    formik,
    isSubmitButtonDisabled,
    submitForm,
    passwordHidden,
    rightIcon,
    handlePasswordHidden,
    snackBarProps,
  } = useSignInPassword();

  return (
    <FormikProvider value={formik}>
      <AuthForm
        testID="authForm"
        title={t('inputPassword')}
        text={`${t('weKnowYou')} ${email}`}
        onSubmitPress={submitForm}
        submitButtonText={t('send')}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}
        secondaryButtonText={t('forgetPassword')}
        onSecondaryButtonPress={navigateToRestorePassword}>
        <WithFormikInput<string> name="password">
          {({messageText, ...inputProps}) => (
            <FormInput
              testID={'passwordInput'}
              autoFocus
              iconRight={{
                name: rightIcon,
                checked: !passwordHidden,
              }}
              label={t('password')}
              secureTextEntry={passwordHidden}
              onRightIconPress={handlePasswordHidden}
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
