import React from 'react';
import {
  useOnRequestSuccess,
  useTogglePasswordVisibility,
  useTranslation,
} from 'core/hooks';
import {FormInput} from 'atoms';
import {signUpRequest} from 'core/reducers';
import {AuthForm} from 'organisms';
import {useSignUpForm} from './hooks';

export const SignUpForm = () => {
  const {t} = useTranslation('authentification');
  const {
    loading,
    email,
    password,
    setPassword,
    navigateToEmailValidation,
    signUp,
  } = useSignUpForm();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  useOnRequestSuccess(signUpRequest, navigateToEmailValidation);

  return (
    <AuthForm
      title="Введите пароль"
      text={`Придумайте пароль для ${email}`}
      onSubmitPress={signUp}
      submitButtonText={t('send')}
      isSubmitButtonDisabled={false}
      submitButtonLoading={loading}>
      <FormInput
        iconRightName={rightIcon}
        iconLeftName={'lock'}
        size={16}
        placeholder={'password'}
        secureTextEntry={passwordVisibility}
        onRightIconPress={handlePasswordVisibility}
        value={password}
        setValue={setPassword}
      />
    </AuthForm>
  );
};
