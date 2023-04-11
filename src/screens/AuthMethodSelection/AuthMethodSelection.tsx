import React from 'react';
import {View, Text, Linking} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {AuthMethods} from 'organisms';
import {useAuthMethodSelection} from './hooks';
import {themeStyles} from './styles';
import {EPAM_PRIVACY_POLICY_URL, RADZIMA_URL} from 'core/constants';
import {screenOptions} from './screenOptions';
export const AuthMethodSelection = () => {
  const {t} = useTranslation('authentification');
  const {t: tCommon} = useTranslation('common');

  const styles = useThemeStyles(themeStyles);

  const {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
    googleLoading,
    facebookLoading,
    appleLoading,
  } = useAuthMethodSelection();

  return (
    <View style={styles.container}>
      <AuthMethods
        onEmailButtonPress={handleEmailButtonPress}
        onAppleButtonPress={handleAppleButtonPress}
        onFacebookButtonPress={handleFacebookButtonPress}
        onGoogleButtonPress={handleGoogleButtonPress}
        googleLoading={googleLoading}
        facebookLoading={facebookLoading}
        appleLoading={appleLoading}
      />
      <Text style={styles.text}>
        {`${t('termsAndPolicyInfo')} `}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(RADZIMA_URL)}>
          {t('termsOfUse')}
        </Text>
        {` ${tCommon('and')} `}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(EPAM_PRIVACY_POLICY_URL)}>
          {t('privacyPolicy')}
        </Text>
      </Text>
    </View>
  );
};

AuthMethodSelection.screenOptions = screenOptions;
