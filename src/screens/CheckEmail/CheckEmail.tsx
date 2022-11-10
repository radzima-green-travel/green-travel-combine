import React, {useCallback, useEffect, useState} from 'react';
import {useOnRequestSuccess, useRequestLoading} from 'core/hooks';
import {FormInput} from 'atoms';
import {checkUserEmailRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AuthForm} from 'organisms';
import {CheckEmailScreenNavigationProps} from './types';

export const CheckEmail = () => {
  const navigation = useNavigation<CheckEmailScreenNavigationProps>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  const checkEmail = useCallback(() => {
    dispatch(checkUserEmailRequest(email));
  }, [dispatch, email]);

  const {loading} = useRequestLoading(checkUserEmailRequest);

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
      title="Введите электронный адрес"
      text="Давайте проверим есть ли у Вас аккаунт..."
      onSubmitPress={checkEmail}
      submitButtonText="Проверить"
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
