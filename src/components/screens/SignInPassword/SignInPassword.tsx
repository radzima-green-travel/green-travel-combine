import React, {useCallback, useState} from 'react';

import {
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {signInRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {SignInPasswordScreenRouteProps} from './types';

export const SignInPassword = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    params: {email},
  } = useRoute<SignInPasswordScreenRouteProps>();
  const [password, setPassword] = useState('');

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  const navigateToRestorePassword = useCallback(() => {
    navigation.navigate('RestorePassword');
  }, [navigation]);

  const signIn = useCallback(() => {
    dispatch(signInRequest({email, password}));
  }, [dispatch, email, password]);

  const {loading} = useRequestLoading(signInRequest);
  useOnRequestSuccess(signInRequest, () => {
    navigation.getParent()?.goBack();
  });

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
