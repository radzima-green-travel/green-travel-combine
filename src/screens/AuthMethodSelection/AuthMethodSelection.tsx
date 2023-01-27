import React from 'react';
import {View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {AuthMethods} from 'organisms';
import {useAuthMethodSelection} from './hooks';
import {themeStyles} from './styles';

export const AuthMethodSelection = () => {
  const styles = useThemeStyles(themeStyles);

  const {
    handleEmailButtonPress,
    handleGoogleButtonPress,
    handleFacebookButtonPress,
    handleAppleButtonPress,
  } = useAuthMethodSelection();

  return (
    <View style={styles.container}>
      <AuthMethods
        onEmailButtonPress={handleEmailButtonPress}
        onAppleButtonPress={handleAppleButtonPress}
        onFacebookButtonPress={handleFacebookButtonPress}
        onGoogleButtonPress={handleGoogleButtonPress}
      />
    </View>
  );
};
