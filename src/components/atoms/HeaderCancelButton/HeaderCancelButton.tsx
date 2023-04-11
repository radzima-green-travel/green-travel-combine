import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, Text} from 'react-native';
import {themeStyles} from './styles';
interface IProps {
  onPress: () => void;
}

export const HeaderCancelButton = memo(({onPress}: IProps) => {
  const {t} = useTranslation('common');

  const styles = useThemeStyles(themeStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{t('cancel')}</Text>
    </TouchableOpacity>
  );
});
