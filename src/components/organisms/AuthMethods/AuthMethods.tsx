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
}

export const AuthMethods = memo(
  ({
    onEmailButtonPress,
    onGoogleButtonPress,
    onFacebookButtonPress,
    onAppleButtonPress,
  }: IProps) => {
    const {t} = useTranslation('authentification');
    const {t: tCommon} = useTranslation('common');

    const styles = useThemeStyles(themeStyles);

    const AppleButton = () => (
      <Button
        theme={'blackAndWhite'}
        onPress={onAppleButtonPress}
        text={t('appleAuth')}
        leftIcon={() => <Icon name={'appleAuth'} style={styles.appleIcon} />}
      />
    );

    const EmailButton = ({isOtherOption}: {isOtherOption?: boolean}) => (
      <Button
        theme={isOtherOption ? 'bordered' : 'green'}
        style={isOtherOption && styles.otherOptionsButton}
        onPress={onEmailButtonPress}
        text={t('emailAuth')}
        leftIcon={() => (
          <Icon
            name={'emailAuth'}
            style={
              isOtherOption
                ? styles.emailIconOtherOption
                : styles.emailIconFirstOption
            }
          />
        )}
      />
    );

    const FirstButton = isIOS ? AppleButton : EmailButton;

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
          leftIcon={() => <Icon name={'facebookAuth'} />}
        />
        <Button
          theme={'bordered'}
          style={styles.otherOptionsButton}
          onPress={onGoogleButtonPress}
          text={t('googleAuth')}
          leftIcon={() => <Icon name={'googleAuth'} />}
        />
        {isIOS && EmailButton({isOtherOption: true})}
      </View>
    );
  },
);
