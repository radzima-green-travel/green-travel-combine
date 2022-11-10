import React from 'react';

import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useRestorePassword} from './hooks';

export const RestorePassword = () => {
  const {
    t,
    email,
    onResendPassword,
    buttonText,
    isEmailCorrect,
    loading,
    navigateToSignIn,
    setEmail,
    
  } = useRestorePassword();

  return (
    <AuthForm
      title={t('restorePassword')}
      text={t('restorePasswordInstruction')}
      onSubmitPress={onResendPassword}
      submitButtonText={buttonText}
      isSubmitButtonDisabled={!isEmailCorrect}
      submitButtonLoading={loading}
      secondaryButtonText="Вернуться и войти"
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
