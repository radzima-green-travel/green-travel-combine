import React from 'react';

import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useSignInPassword} from './hooks';

export const SignInPassword = () => {
  const {
    email,
    signIn,
    loading,
    navigateToRestorePassword,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
    password,
    setPassword,
  } = useSignInPassword();

  return (
    <AuthForm
      title="Введите пароль"
      text={`Похоже мы уже знаем Вас ${email}`}
      onSubmitPress={signIn}
      submitButtonText="Отправить"
      isSubmitButtonDisabled={false}
      submitButtonLoading={loading}
      secondaryButtonText="Забыли пароль?"
      onSecondaryButtonPress={navigateToRestorePassword}>
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
