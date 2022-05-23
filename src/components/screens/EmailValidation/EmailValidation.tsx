import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Button, OneTimeCode} from 'atoms';
import {Auth} from 'aws-amplify';
import {IProps} from './types';

export const EmailValidation = ({navigation, route}: IProps) => {
  const [isCodeFull, setIsCodeFull] = useState(false);
  const [code, setCode] = useState('');
  const {t} = useTranslation('authentification');
  const buttonText = t('ready').toUpperCase();

  const {
    params: {email},
  } = route;

  const getEmailCode = (emailCode, isCode) => {
    setIsCodeFull(isCode);
    setCode(emailCode);
  };

  const onConfirm = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  const onResendEmail = async () => {
    try {
      await Auth.resendSignUp(email);
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>{t('signUpValidationTitle')}</Text>
          <Text style={styles.text}>
            {t('signUpValidationText')} {email}
          </Text>
          <OneTimeCode onCodeInput={getEmailCode} />
          <Pressable onPress={onResendEmail}>
            <Text style={styles.repeatText}>{t('repeatAttempt')}</Text>
          </Pressable>
        </View>
        <Button
          style={!isCodeFull ? styles.notActivated : null}
          onPress={onConfirm}>
          {buttonText}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
