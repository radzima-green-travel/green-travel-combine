import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  confirmSignUpRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
  signInRequest,
} from 'core/reducers';
import {themeStyles} from './styles';
import {
  useThemeStyles,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {Button, OneTimeCode} from 'atoms';
import {IProps} from './types';

export const EmailValidation = ({navigation, route}: IProps) => {
  const [isCodeFull, setIsCodeFull] = useState(false);
  const [code, setCode] = useState('');
  const {t} = useTranslation('authentification');
  const styles = useThemeStyles(themeStyles);
  const buttonText = t('ready').toUpperCase();

  const dispatch = useDispatch();

  const {
    params: {email, password, isSignUp},
  } = route;

  const getEmailCode = (emailCode, isCode) => {
    setIsCodeFull(isCode);
    setCode(emailCode);
  };

  const {loading} = useRequestLoading(confirmSignUpRequest);

  useOnRequestSuccess(confirmSignUpRequest, () => {
    navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
  });

  const onConfirmSignUp = useCallback(() => {
    dispatch(confirmSignUpRequest({email, code}));
    dispatch(signInRequest({email, password: password!}));
  }, [dispatch, email, code, password]);

  const onConfirmForgotPassword = () => {
    navigation.navigate('NewPassword', {email, code});
  };

  const onResendSignUpCodetoEmail = useCallback(() => {
    dispatch(resendSignUpCodeRequest(email));
  }, [dispatch, email]);

  const onResendRestorePasswordCodetoEmail = useCallback(() => {
    dispatch(forgotPasswordRequest({email}));
  }, [dispatch, email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>
            {isSignUp ? t('signUpValidationTitle') : t('emailValidationTitle')}
          </Text>
          <Text style={styles.text}>
            {t('signUpValidationText')} {email}
          </Text>
          <OneTimeCode onCodeInput={getEmailCode} />
        </View>
        <Button
          style={!isCodeFull ? styles.notActivated : null}
          onPress={isSignUp ? onConfirmSignUp : onConfirmForgotPassword}
          loading={loading}>
          {buttonText}
        </Button>
        <Pressable
          onPress={
            isSignUp
              ? onResendSignUpCodetoEmail
              : onResendRestorePasswordCodetoEmail
          }>
          <Text style={styles.repeatText}>{t('repeatAttempt')}</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
