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

  const {changeLanguage, userLanguage, loading, itemLanguage} =
    useProfileSettingsLanguage();

  return (
    <View style={styles.container}>
      <GeneralListItem
        position="top"
        loading={!itemLanguage && loading}
        onPress={() => changeLanguage(null)}
        title={t('System')}
        renderLeftElement={
          !userLanguage && <Icon color={COLORS.apple} name="check" size={16} />
        }
      />
      <GeneralListItem
        position="middle"
        loading={itemLanguage === 'en' && loading}
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
        loading={itemLanguage === 'ru' && loading}
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
        loading={itemLanguage === 'zh' && loading}
        onPress={() => changeLanguage('zh')}
        title={t('zh')}
        renderLeftElement={
          userLanguage === 'zh' && (
            <Icon color={COLORS.apple} name="check" size={16} />
          )
        }
      />
    </View>
  );
};
