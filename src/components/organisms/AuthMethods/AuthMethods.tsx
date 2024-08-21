import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Button, Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {isIOS} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';
import {composeTestID} from 'core/helpers';

interface IProps {
  onEmailButtonPress: () => void;
  onGoogleButtonPress: () => void;
  onFacebookButtonPress: () => void;
  onAppleButtonPress: () => void;
  googleLoading?: boolean;
  facebookLoading?: boolean;
  appleLoading?: boolean;
  testID: string;
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
    testID,
  }: IProps) => {
    const {t} = useTranslation('authentification');
    const {t: tCommon} = useTranslation('common');

    const styles = useThemeStyles(themeStyles);

    const getAppleButton = () => (
      <Button
        testID={composeTestID(testID, 'appleButton')}
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

    const getGmailButton = () => (
      <Button
        testID={composeTestID(testID, 'googleButton')}
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

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('authSelectionTitle')}</Text>
        {isIOS ? getAppleButton() : getGmailButton()}
        <View style={styles.separatorSection}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>{tCommon('or')}</Text>
          <View style={styles.separator} />
        </View>
        <Button
          testID={composeTestID(testID, 'facebookButton')}
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
        {isIOS && getGmailButton()}
        <Button
          testID={composeTestID(testID, 'emailButton')}
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
