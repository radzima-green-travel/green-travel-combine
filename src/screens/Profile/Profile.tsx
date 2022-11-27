import React from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon, SettingsSectionTitle} from 'atoms';
import {useProfile} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {useSelector} from 'react-redux';
import {selectUserEmail} from 'core/selectors';

export const Profile = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);
  const {
    isAuthorized,
    onAuthorisationItemPress,
    navigateToProfileSettingsTheme,
  } = useProfile();

  const userEmail = useSelector(selectUserEmail);

  return (
    <View style={styles.container}>
      <View style={styles.authItemContainer}>
        <GeneralListItem
          size="M"
          onPress={onAuthorisationItemPress}
          title={
            isAuthorized ? t('authorized.title') : t('notAuthorrized.title')
          }
          subtitle={isAuthorized ? userEmail : t('notAuthorrized.subtitle')}
          renderLeftElement={<Icon name="defaultAcc" size={60} />}
          withChevron
        />
      </View>

      <SettingsSectionTitle text="Настройки" />
      <GeneralListItem
        position="top"
        onPress={() => {}}
        title={t('dataAndMemory')}
        renderLeftElement={<Icon name="memoryNData" size={30} />}
        withChevron
      />
      <GeneralListItem
        position="middle"
        onPress={() => {}}
        title={t('language')}
        renderLeftElement={<Icon name="language" size={30} />}
        withChevron
      />
      <GeneralListItem
        position="bottom"
        onPress={navigateToProfileSettingsTheme}
        title={t('theme')}
        renderLeftElement={<Icon name="theme" size={30} />}
        withChevron
      />
    </View>
  );
};
