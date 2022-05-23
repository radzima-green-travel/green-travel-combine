import React, {useState, useEffect} from 'react';
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
import {Button, FormInput} from 'atoms';
import {Auth} from 'aws-amplify';
import {IProps} from './types';

export const RestorePassword = ({navigation}: IProps) => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const {t} = useTranslation('authentification');
  const buttonText = t('send').toUpperCase();

  const navigateToSignIn = () => {
    navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
  };

  // TODO: add parameters to Auth.forgotPassword
  const onResendPassword = async () => {
    try {
      await Auth.forgotPassword(email);
      navigation.navigate('EmailValidation', {email});
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

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
