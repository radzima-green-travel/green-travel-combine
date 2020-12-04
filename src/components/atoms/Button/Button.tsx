import React, {memo} from 'react';
import capitalize from 'lodash/capitalize';
import {TouchableOpacity, Text, StyleProp, ViewStyle} from 'react-native';

import {styles} from './styles';

interface Props {
  label: string;
  onPress?: () => void;
  color?: string;
  type?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Button = memo(
  ({
    onPress,
    color = '#61B033',
    label,
    type = 'solid',
    containerStyle,
  }: Props) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          {
            ...styles[`container${capitalize(type)}`],
            backgroundColor: type === 'solid' ? color : 'transparent',
          },
          containerStyle,
        ]}>
        <Text style={styles[`label${capitalize(type)}`]}>{label}</Text>
      </TouchableOpacity>
    );
  },
);
