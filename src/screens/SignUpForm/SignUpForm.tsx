import React from 'react';
import {useOnRequestSuccess} from 'core/hooks';
import {FormInput} from 'atoms';
import {signUpRequest} from 'core/reducers';
import {AuthForm} from 'organisms';
import {useSignUpForm} from './hooks';

export const SignUpForm = () => {
  const {
    t,
    loading,
    email,
    password,
    setPassword,
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    navigateToEmailValidation,
    signUp,
  } = useSignUpForm();

  useOnRequestSuccess(signUpRequest, navigateToEmailValidation);

  return (
    <AuthForm
      title={t('inputPassword')}
      text={`${t('createPasswordFor')} ${email}`}
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
