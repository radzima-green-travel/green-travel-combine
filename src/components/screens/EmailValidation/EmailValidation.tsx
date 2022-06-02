import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {confirmSignUpRequest, resendSignUpCodeRequest} from 'core/reducers';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Button, OneTimeCode} from 'atoms';
import {IProps} from './types';

export const EmailValidation = ({navigation, route}: IProps) => {
  const [isCodeFull, setIsCodeFull] = useState(false);
  const [code, setCode] = useState('');
  const {t} = useTranslation('authentification');
  const buttonText = t('ready').toUpperCase();

  const dispatch = useDispatch();

  const {
    params: {email, restorePassword},
  } = route;

  const getEmailCode = (emailCode, isCode) => {
    setIsCodeFull(isCode);
    setCode(emailCode);
  };

  const onConfirmSignUp = useCallback(() => {
    dispatch(confirmSignUpRequest({email, code}));
    navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
  }, [dispatch, email, code, navigation]);

  const onConfirmForgotPassword = () => {
    navigation.navigate('NewPassword', {email, code});
  };

  const onResendSignUpCodetoEmail = useCallback(() => {
    dispatch(resendSignUpCodeRequest(email));
  }, [dispatch, email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>{t('signUpValidationTitle')}</Text>
          <Text style={styles.text}>
            {t('signUpValidationText')} {email}
          </Text>
          <OneTimeCode onCodeInput={getEmailCode} />
          {restorePassword ? null : (
            <Pressable onPress={onResendSignUpCodetoEmail}>
              <Text style={styles.repeatText}>{t('repeatAttempt')}</Text>
            </Pressable>
          )}
        </View>
        <Button
          style={!isCodeFull ? styles.notActivated : null}
          onPress={restorePassword ? onConfirmForgotPassword : onConfirmSignUp}>
          {buttonText}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
