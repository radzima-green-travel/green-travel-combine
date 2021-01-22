import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';

interface IProps {
  title: string;
  onPress: () => void;
  iconName:
    | 'strokeBike'
    | 'strokeChurch'
    | 'strokeFlag'
    | 'strokeFootprint'
    | 'strokeForest';
}

export const ObjectInlcudesItem = memo(({iconName, title, onPress}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <Icon width={44} height={44} name={iconName} />
      <Text style={styles.text}>{title}</Text>
      <Icon color={COLORS.logCabin} width={6} height={12} name="chevronRight" />
    </TouchableOpacity>
  );
});
