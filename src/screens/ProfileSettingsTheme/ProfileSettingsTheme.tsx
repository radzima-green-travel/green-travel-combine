import React from 'react';
import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {GeneralListItem} from 'molecules';
import {View} from 'react-native';
import {useProfileSettingsTheme} from './hooks';
import {THEMES} from 'core/constants';

export const ProfileSettingsTheme = () => {
  const {t, styles, currentTheme, changeTheme} = useProfileSettingsTheme();

  return (
    <View style={styles.container}>
      {/* {currentTheme ? ( */}
      <GeneralListItem
        position="top"
        onPress={() => changeTheme(THEMES.SYSTEM)}
        title={t('system')}
        renderLeftElement={
          currentTheme === THEMES.SYSTEM && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      {/* ) : null} */}
      <GeneralListItem
        position="middle"
        onPress={() => changeTheme(THEMES.LIGHT)}
        title={t('light')}
        renderLeftElement={
          currentTheme === THEMES.LIGHT && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      <GeneralListItem
        position="bottom"
        onPress={() => changeTheme(THEMES.DARK)}
        title={t('dark')}
        renderLeftElement={
          currentTheme === THEMES.DARK && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
    </View>
  );
};
