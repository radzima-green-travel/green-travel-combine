import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthForm} from 'atoms';
import {AuthSocial} from 'molecules';

export const SignIn = () => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signInTitle')}</Text>
      <AuthSocial size={48} />
      <View style={styles.textContainer}>
        <View style={styles.lineAround} />
        <Text style={styles.text}>{t('or')}</Text>
        <View style={styles.lineAround} />
      </View>
      <AuthForm isSignUp={false} />
      <Text style={styles.passwordText}>{t('forgetPassword')}</Text>
    </View>
  );
};
