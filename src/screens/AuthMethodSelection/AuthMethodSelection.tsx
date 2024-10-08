import React from 'react';
import {View, Text} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {AuthMethods} from 'organisms';
import {useAuthMethodSelection} from './hooks';
import {themeStyles} from './styles';
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
    navigateToPrivacyPolicy,
    navigateToTermsAndConditions,
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
        testID="authMethods"
      />
      <Text style={styles.text}>
        {`${t('termsAndPolicyInfo')} `}
        <Text style={styles.linkText} onPress={navigateToTermsAndConditions}>
          {tCommon('termsAndConditions')}
        </Text>
        {` ${tCommon('and')} `}
        <Text style={styles.linkText} onPress={navigateToPrivacyPolicy}>
          {tCommon('privacyPolicy')}
        </Text>
      </Text>
    </View>
  );
};

AuthMethodSelection.screenOptions = screenOptions;
