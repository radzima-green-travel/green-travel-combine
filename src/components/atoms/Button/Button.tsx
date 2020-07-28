import React, {memo} from 'react';
import capitalize from 'lodash/capitalize';
import {TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';

interface Props {
  label: string;
  onPress?: () => void;
  color?: string;
  type?: string;
}

export const Button = memo(
  ({onPress, color = '#61B033', label, type = 'solid'}: Props) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles[`container${capitalize(type)}`],
          backgroundColor: type === 'solid' ? color : 'transparent',
        }}>
        <Text style={styles[`label${capitalize(type)}`]}>{label}</Text>
      </TouchableOpacity>
    );
  },
);
