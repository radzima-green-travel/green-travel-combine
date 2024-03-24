import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

interface IProps {
  rating: number;
  label: string;
  iconName: IconsNames;
}

export const RatingBadge = memo(({rating, label, iconName}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={16} style={styles.icon} />
      <Text style={styles.countLabel}>{rating}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
});
