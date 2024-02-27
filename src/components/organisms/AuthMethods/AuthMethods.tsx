import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Button, Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {isIOS} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';
import {getPlatformsTestID} from 'core/helpers';
import {TestIDs} from 'core/types';

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
        {...getPlatformsTestID(TestIDs.AppleAuthButton)}
        theme={'blackAndWhite'}
        style={styles.otherOptionsButton}
        onPress={onAppleButtonPress}
        text={t('appleAuth')}
        icon={() => <Icon name={'appleAuth'} style={styles.appleIcon} />}
        loading={appleLoading}
        disabled={googleLoading || facebookLoading}
        iconPosition="left"
      />
    );

    const GmailButton = () => (
      <Button
        {...getPlatformsTestID(TestIDs.GoogleAuthButton)}
        theme={'secondary'}
        style={styles.otherOptionsButton}
        onPress={onGoogleButtonPress}
        text={t('googleAuth')}
        icon={() => <Icon name={'googleAuth'} />}
        loading={googleLoading}
        disabled={appleLoading || facebookLoading}
        textStyle={styles.otherButtonText}
        iconPosition="left"
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
          {...getPlatformsTestID(TestIDs.FacebookAuthButton)}
          theme={'secondary'}
          style={styles.otherOptionsButton}
          textStyle={styles.otherButtonText}
          onPress={onFacebookButtonPress}
          text={t('facebookAuth')}
          disabled={googleLoading || facebookLoading}
          loading={facebookLoading}
          icon={() => <Icon name={'facebookAuth'} />}
          iconPosition="left"
        />
        {isIOS && <GmailButton />}
        <Button
          {...getPlatformsTestID(TestIDs.EmailAuthButton)}
          theme={'secondary'}
          textStyle={styles.otherButtonText}
          style={styles.otherOptionsButton}
          onPress={onEmailButtonPress}
          text={t('emailAuth')}
          icon={() => (
            <Icon name={'emailAuth'} style={styles.emailIconOtherOption} />
          )}
          iconPosition="left"
        />
      </View>
    );
  },
);
