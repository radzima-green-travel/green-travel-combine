import React, {useCallback} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import {Trans} from 'react-i18next';
import {useTranslation} from 'core/hooks';
import {AuthForm, Divider} from 'atoms';
import {AuthSocial} from 'molecules';
import {IProps} from './types';

export const SignUp = ({navigation}: IProps) => {
  const {t} = useTranslation('authentification');

  const navigateToEmailValidation = useCallback(
    email => {
      navigation.navigate('EmailValidation', {email, isSignUp: true});
    },
    [navigation],
  );

  // TODO: add actual links to Terms of Use and Privacy Policy
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('signUpTitle')}</Text>
        <AuthForm isSignUpScreen={true} onPress={navigateToEmailValidation} />
        <Divider text={'signInWith'} marginVertical={27} />
        <AuthSocial size={48} />

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
