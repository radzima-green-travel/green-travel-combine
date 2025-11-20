import React from 'react';
import { useTranslation } from 'core/hooks';
import { FormInput, PasswordHint, SnackBar, WithFormikInput } from 'atoms';
import { AuthForm } from 'organisms';
import { useNewPassword } from './hooks';
import { FormikProvider } from 'formik';

export const NewPassword = () => {
  const { t } = useTranslation('authentification');
  const {
    formik,
    loading,
    buttonText,
    rightIcon,
    passwordHidden,
    handlePasswordHidden,
    isSubmitButtonDisabled,
    submitForm,
    snackBarProps,
  } = useNewPassword();

  return (
    <FormikProvider value={formik}>
      <AuthForm
        title={t('newPassword')}
        onSubmitPress={submitForm}
        submitButtonText={buttonText}
        testID="authForm"
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}>
        <WithFormikInput<string> name="password">
          {({ messageText, ...inputProps }) => (
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
              helperText={
                <PasswordHint
                  testID="passwordInputHint"
                  passwordValue={inputProps.value}
                />
              }
              {...inputProps}
              error={false}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};
