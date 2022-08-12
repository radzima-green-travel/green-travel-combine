import React, {useCallback, useState, useEffect} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {forgotPasswordRequest} from 'core/reducers';
import {Button, FormInput} from 'atoms';
import {IProps} from './types';

export const RestorePassword = ({navigation}: IProps) => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const {t} = useTranslation('authentification');
  const styles = useThemeStyles(themeStyles);
  const buttonText = t('send').toUpperCase();

  const dispatch = useDispatch();

  const navigateToSignIn = () => {
    navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
  };

  const onResendPassword = useCallback(() => {
    dispatch(forgotPasswordRequest({email: email.trim()}));
    navigation.navigate('EmailValidation', {email: email.trim(), isSignUp: false});
  }, [dispatch, email, navigation]);

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>{t('restorePassword')}</Text>
          <Text style={styles.text}>{t('restorePasswordInstruction')}</Text>
          <FormInput
            iconLeftName={'email'}
            size={16}
            placeholder={'email'}
            value={email}
            setValue={setEmail}
          />
        </View>
        <Button
          style={!isEmailCorrect ? styles.notActivated : null}
          onPress={onResendPassword}>
          {buttonText}
        </Button>
        <Pressable onPress={navigateToSignIn}>
          <Text style={styles.returnText}>{t('returnAndEnter')}</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
