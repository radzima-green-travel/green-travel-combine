import React from 'react';
import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {GeneralListItem} from 'molecules';
import {View} from 'react-native';
import {useProfileSettingsTheme} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const ProfileSettingsTheme = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);

  const {changeTheme, userTheme} = useProfileSettingsTheme();

  return (
    <View style={styles.container}>
      <GeneralListItem
        position="top"
        onPress={(_, event) => changeTheme(null, event)}
        title={t('systemTheme')}
        renderRightElement={
          !userTheme && <Icon color={COLORS.apple} name="CheckXL" size={24} />
        }
      />
      <GeneralListItem
        position="middle"
        onPress={(_, event) => changeTheme('light', event)}
        title={t('light')}
        renderRightElement={
          userTheme === 'light' && (
            <Icon color={COLORS.apple} name="CheckXL" size={24} />
          )
        }
      />
      <GeneralListItem
        position="bottom"
        onPress={(_, event) => changeTheme('dark', event)}
        title={t('dark')}
        renderRightElement={
          userTheme === 'dark' && (
            <Icon color={COLORS.apple} name="CheckXL" size={24} />
          )
        }
      />
    </View>
  );
};
