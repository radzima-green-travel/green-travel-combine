import React from 'react';

import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useSignInPassword} from './hooks';
import {useTranslation} from 'react-i18next';
import {useTogglePasswordVisibility} from 'core/hooks';

export const SignInPassword = () => {
  const {t} = useTranslation('authentification');
  const {
    email,
    signIn,
    loading,
    navigateToRestorePassword,
    password,
    setPassword,
  } = useSignInPassword();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  return (
    <AuthForm
      title={t('inputPassword')}
      text={`${t('weKnowYou')} ${email}`}
      onSubmitPress={signIn}
      submitButtonText={t('send')}
      isSubmitButtonDisabled={false}
      submitButtonLoading={loading}
      secondaryButtonText={t('forgetPassword')}
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
