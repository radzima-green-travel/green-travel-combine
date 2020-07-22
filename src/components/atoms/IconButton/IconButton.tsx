import React, {memo, ComponentProps} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {styles} from './styles';
import {Icon} from '../Icon';

export interface Props {
  icon: ComponentProps<typeof Icon>;
  style?: StyleProp<ViewStyle>;
}

export const IconButton = memo(({icon, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Icon {...icon} />
    </View>
  );
});
