import React, {memo, ComponentProps} from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {styles} from './styles';
import {Icon} from '../Icon';

export interface Props {
  icon: ComponentProps<typeof Icon>;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = memo(({icon, style, onPress}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon {...icon} />
    </TouchableOpacity>
  );
});
