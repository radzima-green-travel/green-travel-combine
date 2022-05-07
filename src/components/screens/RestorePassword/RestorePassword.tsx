import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';

export const RestorePassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const {t} = useTranslation('authentification');
  const buttonText = t('send').toUpperCase();

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
        <Button style={!isEmailCorrect ? styles.notActivated : null}>
          {buttonText}
        </Button>
        <Pressable>
          <Text style={styles.returnText}>{t('returnAndEnter')}</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
