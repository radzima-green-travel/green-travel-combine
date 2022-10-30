import React, {useCallback, useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {forgotPasswordRequest} from 'core/reducers';
import {FormInput} from 'atoms';
import {IProps} from './types';
import {AuthForm} from 'organisms';

export const RestorePassword = ({navigation}: IProps) => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const {t} = useTranslation('authentification');
  const buttonText = t('send').toUpperCase();

  const dispatch = useDispatch();

  const navigateToSignIn = () => {
    navigation.popToTop();
  };

  const onResendPassword = useCallback(() => {
    dispatch(forgotPasswordRequest({email}));
  }, [dispatch, email]);

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  const {loading} = useRequestLoading(forgotPasswordRequest);

  useOnRequestSuccess(forgotPasswordRequest, () => {
    navigation.navigate('EmailValidation', {email, isSignUp: false});
  });

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
