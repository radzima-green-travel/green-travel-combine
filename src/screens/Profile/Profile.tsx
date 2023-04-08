import React from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon, SettingsSectionTitle, SnackBar} from 'atoms';
import {useProfile} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const Profile = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);
  const {
    userName,
    isAuthorized,
    onAuthorisationItemPress,
    navigateToProfileSettingsLanguage,
    navigateToProfileSettingsTheme,
    loading,
    onClearCachePress,
    snackBarProps,
  } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.authItemContainer}>
        <GeneralListItem
          size="M"
          onPress={onAuthorisationItemPress}
          title={
            isAuthorized ? t('authorized.title') : t('notAuthorrized.title')
          }
          subtitle={isAuthorized ? userName : t('notAuthorrized.subtitle')}
          withChevron
          loading={loading}
        />
      </View>

      <View style={styles.settingsItemContainer}>
        <SettingsSectionTitle text={t('settings')} />
        <GeneralListItem
          position="top"
          onPress={navigateToProfileSettingsLanguage}
          title={t('language')}
          renderLeftElement={<Icon name="language" size={30} />}
          withChevron
        />
        <GeneralListItem
          position="middle"
          onPress={navigateToProfileSettingsTheme}
          title={t('theme')}
          renderLeftElement={<Icon name="theme" size={30} />}
          withChevron
        />
        <GeneralListItem
          position="bottom"
          onPress={onClearCachePress}
          title={t('clearCache')}
          renderLeftElement={<Icon name="clearCashe" size={30} />}
          withChevron
        />
      </View>

      <SettingsSectionTitle text={t('info')} />
      <GeneralListItem
        position="top"
        onPress={() => {}}
        title={t('policyPrivacy')}
        withChevron
      />
      <GeneralListItem
        position="bottom"
        onPress={() => {}}
        title={t('termsOfUse')}
        withChevron
      />

      <SnackBar {...snackBarProps} />
    </View>
  );
};
