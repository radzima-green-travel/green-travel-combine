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
          renderLeftElement={<Icon name="defaultAcc" size={60} />}
          withChevron
          loading={loading}
        />
      </View>

      <SettingsSectionTitle text="Настройки" />
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
        renderLeftElement={<Icon name="memoryNData" size={30} />}
        withChevron
      />
      <SnackBar {...snackBarProps} />
    </View>
  );
};
