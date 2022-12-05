import React from 'react';
import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {GeneralListItem} from 'molecules';
import {View} from 'react-native';
import {useProfileSettingsLanguage} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const ProfileSettingsLanguage = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);

  const {changeLang, userLang} = useProfileSettingsLanguage();

  return (
    <View style={styles.container}>
      <GeneralListItem
        position="top"
        onPress={() => changeLang('en')}
        title={t('English')}
        renderLeftElement={
          userLang === 'en' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      <GeneralListItem
        position="middle"
        onPress={() => changeLang('ru')}
        title={t('Русский')}
        renderLeftElement={
          userLang === 'ru' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      <GeneralListItem
        position="bottom"
        onPress={() => changeLang('zh')}
        title={t('zh')}
        renderLeftElement={
          userLang === 'zh' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
    </View>
  );
};
