import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface BaseListItemProps {
  testID: string;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  withNavigationIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface ListItemWrapperProps {
  testID: string;
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
