import React from 'react';
import {COLORS} from 'assets';
import {Icon, SuspenseView} from 'atoms';
import {GeneralListItem} from 'molecules';
import {View} from 'react-native';
import {useProfileSettingsLanguage} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const ProfileSettingsLanguage = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);

  const {changeLanguage, appLanguage, loading} = useProfileSettingsLanguage();

  return (
    <SuspenseView loading={!appLanguage && loading}>
      <View style={styles.container}>
        <GeneralListItem
          position="top"
          onPress={() => changeLanguage('en')}
          title={t('English')}
          renderLeftElement={
            appLanguage === 'en' && (
              <Icon color={COLORS.apple} name="check" size={16} />
            )
          }
        />
        <GeneralListItem
          position="middle"
          onPress={() => changeLanguage('ru')}
          title={t('Русский')}
          renderLeftElement={
            appLanguage === 'ru' && (
              <Icon color={COLORS.apple} name="check" size={16} />
            )
          }
        />
        <GeneralListItem
          position="bottom"
          onPress={() => changeLanguage('zh')}
          title={t('zh')}
          renderLeftElement={
            appLanguage === 'zh' && (
              <Icon color={COLORS.apple} name="check" size={16} />
            )
          }
        />
      </View>
    </SuspenseView>
  );
};
