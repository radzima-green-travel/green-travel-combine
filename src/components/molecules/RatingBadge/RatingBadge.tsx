import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Icon } from 'atoms';
import { IconsNames } from 'atoms/Icon';
import { composeTestID } from 'core/helpers';
import { useThemeStyles } from 'core/hooks';
import { capitalize, isUndefined } from 'lodash';
import { themeStyles } from './styles';

interface IProps {
  testID: string;
  rating: number;
  label?: string;
  iconName: IconsNames;
  size?: 'small' | 'medium';
}

export const RatingBadge = memo(
  ({ testID, rating, label, iconName, size = 'medium' }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const containerSizeStyle = styles[`container${capitalize(size)}`];

    const iconSize = size === 'medium' ? 16 : 13;

    return (
      <View testID={testID} style={[styles.container, containerSizeStyle]}>
        <Icon
          testID={composeTestID(testID, 'icon')}
          name={iconName}
          size={iconSize}
          style={styles.icon}
        />
        <Text testID={composeTestID(testID, 'value')} style={styles.countLabel}>
          {rating.toFixed(1)}
        </Text>
        {!isUndefined(label) && (
          <Text testID={composeTestID(testID, 'label')} style={styles.label}>
            {label}
          </Text>
        )}
      </View>
    );
  },
);
