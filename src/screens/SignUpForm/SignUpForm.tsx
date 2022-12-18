import React from 'react';
import {useTranslation} from 'core/hooks';
import {FormInput, SnackBar, WithFormikInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useSignUpForm} from './hooks';
import {FormikProvider} from 'formik';

export const SignUpForm = () => {
  const {t} = useTranslation('authentification');
  const {
    loading,
    email,
    submitForm,
    isSubmitButtonDisabled,
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    formik,
    snackBarProps,
  } = useSignUpForm();

  return (
    <FormikProvider value={formik}>
      <AuthForm
        title={t('inputPassword')}
        text={t('createPasswordFor', {email})}
        onSubmitPress={submitForm}
        submitButtonText={t('send')}
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
              {...inputProps}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar isOnTop {...snackBarProps} />
    </FormikProvider>
  );
};
