import {IconsNames} from 'components/atoms/Icon';
import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface BaseListItemProps {
  testID: string;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leadIcon?: IconsNames;
  tailIcon?: IconsNames;
  subtitle?: string | number;
  contentStylingType?: 'primary' | 'secondary';
  onSubtitlePress?: () => void;
  onRightLabelPress?: () => void;
  leadIconStyle?: StyleProp<TextStyle>;
  tailIconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<TextStyle>;
  position?: 'top' | 'middle' | 'bottom' | 'single';
  titleNumberOfLines?: number;
  boldTitle?: boolean;
  onTitleTruncate?: (isTruncated: boolean) => void;
}

export interface ListItemWrapperProps {
  testID: string;
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  position: 'top' | 'middle' | 'bottom' | 'single';
}
