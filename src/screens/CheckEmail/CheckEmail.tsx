import React, {useCallback, useEffect} from 'react';
import {useOnRequestSuccess} from 'core/hooks';
import {FormInput} from 'atoms';
import {checkUserEmailRequest} from 'core/reducers';
import {AuthForm} from 'organisms';
import {useCheckEmail} from './hooks';

export const CheckEmail = () => {
  const {
    t,
    navigation,
    email,
    setIsEmailCorrect,
    dispatch,
    isEmailCorrect,
    loading,
    setEmail,
  } = useCheckEmail();

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email, setIsEmailCorrect]);

  const checkEmail = useCallback(() => {
    dispatch(checkUserEmailRequest(email));
  }, [dispatch, email]);

  useOnRequestSuccess(checkUserEmailRequest, data => {
    if (!data.exist) {
      navigation.navigate('SignUpForm', {email});
    } else if (data.exist) {
      if (data.isConfirmed) {
        navigation.navigate('SignInPassword', {email});
      } else {
        navigation.navigate('EmailValidation', {
          email,
          isSignUp: data.isPasswordReset ? false : true,
        });
      }
    }
  });

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
