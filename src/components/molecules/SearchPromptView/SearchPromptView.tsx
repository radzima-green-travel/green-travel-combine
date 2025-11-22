import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'atoms';
import { SCREEN_WIDTH } from 'services/PlatformService';
import { themeStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useThemeStyles } from 'core/hooks';

const ratio = 343 / 360;
const width = SCREEN_WIDTH;
const height = width * ratio;

export const SearchPromptView = memo(() => {
  const { t } = useTranslation('search');
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('emptySearchPlaceholder')}</Text>
      <Icon
        style={styles.icon}
        name="emptySearch"
        width={width}
        height={height}
      />
    </View>
  );
});
