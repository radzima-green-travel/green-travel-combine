import React from 'react';
import {useTranslation} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useCheckEmail} from './hooks';

export const CheckEmail = () => {
  const {t} = useTranslation('authentification');
  const {email, isEmailCorrect, loading, setEmail, checkEmail} =
    useCheckEmail();

  return (
    <AuthForm
      title={t('enterEmailAddress')}
      text={t('checkAccount')}
      onSubmitPress={checkEmail}
      submitButtonText={t('check')}
      isSubmitButtonDisabled={!isEmailCorrect}
      submitButtonLoading={loading}>
      <FormInput
        iconLeftName={'email'}
        size={16}
        placeholder={'email'}
        value={email}
        setValue={setEmail}
        autoFocus
        // dangerBorder={!!emailTip}
      />
    </AuthForm>
  );
};
