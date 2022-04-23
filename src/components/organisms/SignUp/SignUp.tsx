import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthForm, Divider} from 'atoms';
import {AuthSocial} from 'molecules';

export const SignUp = () => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signUpTitle')}</Text>
      <AuthForm isSignUp={true} />
      <Divider text={'signInWith'} marginVertical={27} />
      <AuthSocial size={48} />
    </View>
  );
};
