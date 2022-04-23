import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthForm, Divider} from 'atoms';
import {AuthSocial} from 'molecules';

export const SignIn = () => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signInTitle')}</Text>
      <AuthSocial size={48} />
      <Divider text={'or'} marginVertical={24} />
      <AuthForm isSignUp={false} />
      <Text style={styles.passwordText}>{t('forgetPassword')}</Text>
    </View>
  );
};
