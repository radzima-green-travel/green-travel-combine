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
        onPress={() => changeTheme(null)}
        title={t('systemTheme')}
        renderRightElement={
          !userTheme && <Icon color={COLORS.apple} name="CheckXL" size={24} />
        }
      />
      <GeneralListItem
        position="middle"
        onPress={() => changeTheme('light')}
        title={t('light')}
        renderRightElement={
          userTheme === 'light' && (
            <Icon color={COLORS.apple} name="CheckXL" size={24} />
          )
        }
      />
      <GeneralListItem
        position="bottom"
        onPress={() => changeTheme('dark')}
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
