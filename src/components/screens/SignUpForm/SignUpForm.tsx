import React, {useCallback, useState} from 'react';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
} from 'core/hooks';
import {FormInput} from 'atoms';

import {useDispatch} from 'react-redux';
import {signUpRequest} from 'core/reducers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthForm} from 'organisms';
import {
  SignUpFormScreenRouteProps,
  SignUpFormScreenNavigationProps,
} from './types';

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const {
    params: {email},
  } = useRoute<SignUpFormScreenRouteProps>();
  const navigation = useNavigation<SignUpFormScreenNavigationProps>();

  const [password, setPassword] = useState('');

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

  const navigateToEmailValidation = useCallback(() => {
    navigation.navigate('CodeVerification', {email, isSignUp: true});
  }, [email, navigation]);

  const signUp = useCallback(() => {
    console.log(email, password);
    dispatch(signUpRequest({email, password}));
  }, [dispatch, email, password]);

  const {loading} = useRequestLoading(signUpRequest);
  useOnRequestSuccess(signUpRequest, navigateToEmailValidation);

  return (
    <AuthForm
      title="Введите пароль"
      text={`Придумайте пароль для ${email}`}
      onSubmitPress={signUp}
      submitButtonText="Отправить"
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
