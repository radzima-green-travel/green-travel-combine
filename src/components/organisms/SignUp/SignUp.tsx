import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthForm} from 'atoms';
import {AuthSocial} from 'molecules';

export const SignUp = () => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('authTitle')}</Text>
      <AuthForm isSignUp={true} />
      <View style={styles.textContainer}>
        <View style={styles.lineAround} />
        <Text style={styles.text}>{t('enterWith')}</Text>
        <View style={styles.lineAround} />
      </View>
      <AuthSocial size={48} />
    </View>
  );
};
