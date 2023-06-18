import React from 'react';
import {useTranslation} from 'core/hooks';
import {FormInput, PasswordHint, SnackBar, WithFormikInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useNewPassword} from './hooks';
import {FormikProvider} from 'formik';
import {screenOptions} from './screenOptions';

export const NewPassword = () => {
  const {t} = useTranslation('authentification');
  const {
    formik,
    loading,
    buttonText,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
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
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}>
        <WithFormikInput<string> name="password">
          {({messageText, ...inputProps}) => (
            <FormInput
              iconRightName={rightIcon}
              iconLeftName={'lock'}
              size={16}
              placeholder={t('password')}
              secureTextEntry={passwordVisibility}
              onRightIconPress={handlePasswordVisibility}
              messageText={messageText ? t(messageText) : undefined}
              helperText={<PasswordHint passwordValue={inputProps.value} />}
              {...inputProps}
              error={false}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};

NewPassword.screenOptions = screenOptions;
