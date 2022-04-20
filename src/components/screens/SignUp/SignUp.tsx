import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthForm, AuthSocial} from 'atoms';

export const SignUp = () => {
  const {t} = useTranslation('authentification');

  return (
    <>
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>{t('enterTab')}</Text>
        </View>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>{t('signUpTab')}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{t('authTitle')}</Text>
        <AuthForm />
        <View style={styles.textContainer}>
          <View style={styles.lineAround} />
          <Text style={styles.text}>{t('enterWith')}</Text>
          <View style={styles.lineAround} />
        </View>
        <AuthSocial size={48} />
        <Text style={styles.warning}>{t('registrationWarning')}</Text>
      </View>
    </>
  );
};
