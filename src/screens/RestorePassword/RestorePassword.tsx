import React from 'react';

import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useRestorePassword} from './hooks';
import {useTranslation} from 'react-i18next';

export const RestorePassword = () => {
  const {t} = useTranslation('authentification');
  const {
    email,
    onResendPassword,
    isEmailCorrect,
    loading,
    navigateToSignIn,
    setEmail,
  } = useRestorePassword();

  const buttonText = t('send').toUpperCase();

  return (
    <AuthForm
      title={t('restorePassword')}
      text={t('restorePasswordInstruction')}
      onSubmitPress={onResendPassword}
      submitButtonText={buttonText}
      isSubmitButtonDisabled={!isEmailCorrect}
      submitButtonLoading={loading}
      secondaryButtonText={t('returnAndEnter')}
      onSecondaryButtonPress={navigateToSignIn}>
      <FormInput
        iconLeftName={'email'}
        size={16}
        placeholder={'email'}
        value={email}
        setValue={setEmail}
        // dangerBorder={!!emailTip}
      />
    </AuthForm>
  );
};
