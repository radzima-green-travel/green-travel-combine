import React, {useCallback} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {Trans} from 'react-i18next';
import {useTranslation} from 'core/hooks';
import {AuthForm, Divider} from 'atoms';
import {AuthSocial} from 'molecules';
import {IProps} from './types';

export const SignIn = ({navigation}: IProps) => {
  const {t} = useTranslation('authentification');

  // TODO: create a check whether user logs in
  const isSignedIn = () => {};

  const navigateToRestorePassword = useCallback(() => {
    navigation.navigate('RestorePassword');
  }, [navigation]);

  // TODO: add actual links to Terms of Use and Privacy Policy
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('signInTitle')}</Text>
        <AuthSocial size={48} />
        <Divider text={'or'} marginVertical={24} />
        <AuthForm isSignUpScreen={false} onPress={isSignedIn} />
        <Pressable onPress={navigateToRestorePassword}>
          <Text style={styles.passwordText}>{t('forgetPassword')}</Text>
        </Pressable>
        <Text style={styles.warning}>
          <Trans
            t={t}
            components={{
              linkStyle: <Text style={styles.link} />,
            }}>
            registrationWarning
          </Trans>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
