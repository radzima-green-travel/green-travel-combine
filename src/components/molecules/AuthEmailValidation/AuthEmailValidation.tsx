import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Button, OneTimeCode} from 'atoms';

export const AuthEmailValildation = () => {
  const [isCodeFull, setIsCodeFull] = useState(false);
  const {t} = useTranslation('authentification');
  const buttonText = t('ready').toUpperCase();

  const isCodeEntered = (codeCondition: boolean) => {
    return setIsCodeFull(codeCondition);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.title}>{t('signUpValidationTitle')}</Text>
        <Text style={styles.text}>{t('signUpValidationText')}</Text>
        <OneTimeCode onCodeInput={isCodeEntered} />
        <Text style={styles.repeatText}>{t('repeatAttempt')}</Text>
      </View>
      <Button style={!isCodeFull ? styles.notActivated : null}>
        {buttonText}
      </Button>
    </View>
  );
};
