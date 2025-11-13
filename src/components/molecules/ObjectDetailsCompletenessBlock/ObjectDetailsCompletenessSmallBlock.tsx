import { useThemeStyles, useTranslation } from 'core/hooks';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { themeStyles } from './styles';
import { CompletnessIndicator } from './components';
import { Icon } from 'atoms';
import { composeTestID } from 'core/helpers';

interface IProps {
  percentage: number;
  testID: string;
  onPress: () => void;
}

export const ObjectDetailsCompletenessSmallBlock = memo(
  ({ percentage, testID, onPress }: IProps) => {
    const { t } = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.containerSmall}
        testID={testID}>
        <Text testID={composeTestID(testID, 'title')} style={styles.titleSmall}>
          {t('helpUsToComplete')}
        </Text>
        <CompletnessIndicator
          testID={composeTestID(testID, 'completenessIndicator')}
          size="s"
          percentage={percentage}
        />
        <Icon name="chevronShortRight" size={16} style={styles.icon} />
      </TouchableOpacity>
    );
  },
);
