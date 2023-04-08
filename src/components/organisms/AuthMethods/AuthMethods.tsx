import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Button, Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {isIOS} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';

interface IProps {
  onEmailButtonPress: () => void;
  onGoogleButtonPress: () => void;
  onFacebookButtonPress: () => void;
  onAppleButtonPress: () => void;
  googleLoading?: boolean;
  facebookLoading?: boolean;
  appleLoading?: boolean;
}

export const AuthMethods = memo(
  ({
    onEmailButtonPress,
    onGoogleButtonPress,
    onFacebookButtonPress,
    onAppleButtonPress,
    googleLoading,
    facebookLoading,
    appleLoading,
  }: IProps) => {
    const {t} = useTranslation('authentification');
    const {t: tCommon} = useTranslation('common');

    const styles = useThemeStyles(themeStyles);

    const AppleButton = () => (
      <Button
        theme={'blackAndWhite'}
        style={styles.otherOptionsButton}
        onPress={onAppleButtonPress}
        text={t('appleAuth')}
        leftIcon={() => <Icon name={'appleAuth'} style={styles.appleIcon} />}
        loading={appleLoading}
        disabled={googleLoading || facebookLoading}
      />
    );

    const GmailButton = () => (
      <Button
        theme={'bordered'}
        style={styles.otherOptionsButton}
        onPress={onGoogleButtonPress}
        text={t('googleAuth')}
        leftIcon={() => <Icon name={'googleAuth'} />}
        loading={googleLoading}
        disabled={appleLoading || facebookLoading}
      />
    );

    const FirstButton = isIOS ? AppleButton : GmailButton;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('authSelectionTitle')}</Text>
        <FirstButton />
        <View style={styles.separatorSection}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>{tCommon('or')}</Text>
          <View style={styles.separator} />
        </View>
        <Button
          theme={'bordered'}
          style={styles.otherOptionsButton}
          onPress={onFacebookButtonPress}
          text={t('facebookAuth')}
          disabled={googleLoading || facebookLoading}
          loading={facebookLoading}
          leftIcon={() => <Icon name={'facebookAuth'} />}
        />
        {isIOS && <GmailButton />}
        <Button
          theme={'bordered'}
          style={styles.otherOptionsButton}
          onPress={onEmailButtonPress}
          text={t('emailAuth')}
          leftIcon={() => (
            <Icon name={'emailAuth'} style={styles.emailIconOtherOption} />
          )}
        />
      </View>
    );
  },
);
