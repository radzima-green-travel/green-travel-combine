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

  const {changeLanguage, userLanguage, getItemDisabled, getItemLoading} =
    useProfileSettingsLanguage();

  return (
    <View style={styles.container}>
      <GeneralListItem
        position="top"
        loading={getItemLoading(null)}
        disabled={getItemDisabled(null)}
        onPress={() => changeLanguage(null)}
        title={t('systemLanguage')}
        renderLeftElement={
          !userLanguage && <Icon color={COLORS.apple} name="check" size={16} />
        }
      />
      <GeneralListItem
        position="middle"
        loading={getItemLoading('en')}
        disabled={getItemDisabled('en')}
        onPress={() => changeLanguage('en')}
        title={t('English')}
        renderLeftElement={
          userLanguage === 'en' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      <GeneralListItem
        position="middle"
        loading={getItemLoading('ru')}
        disabled={getItemDisabled('ru')}
        onPress={() => changeLanguage('ru')}
        title={t('Русский')}
        renderLeftElement={
          userLanguage === 'ru' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
      <GeneralListItem
        position="bottom"
        loading={getItemLoading('zh')}
        disabled={getItemDisabled('zh')}
        onPress={() => changeLanguage('zh')}
        title={t('中國人')}
        renderLeftElement={
          userLanguage === 'zh' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
    </View>
  );
};
