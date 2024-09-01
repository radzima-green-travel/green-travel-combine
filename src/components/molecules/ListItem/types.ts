import {IconsNames} from 'components/atoms/Icon';
import {ReactElement, ReactNode} from 'react';
import {StyleProp, SwitchProps, TextStyle, ViewStyle} from 'react-native';

export interface BaseListItemProps {
  testID: string;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  subtitle?: string | number;
  contentStylingType?: 'primary' | 'secondary';
  onSubtitlePress?: () => void;
  titleContainerStyle?: StyleProp<TextStyle>;
  position?: 'top' | 'middle' | 'bottom' | 'single';
  titleNumberOfLines?: number;
  subTitleNumberOfLines?: number;
  boldTitle?: boolean;
  onTitleTruncate?: (isTruncated: boolean) => void;
  onSubtitleTruncate?: (isTruncated: boolean) => void;
  rightElement?: ReactElement;
  leftElement?: ReactElement | null;
  header?: ReactElement;
}

export interface ListItemPrimaryProps extends BaseListItemProps {
  label?: string;
  tailIcon?: IconsNames;
  onRightLabelPress?: () => void;
  tailIconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leadIcon?: IconsNames;
  leadIconStyle?: StyleProp<TextStyle>;
}
type ItemProp<T> = T extends undefined ? {item?: never} : {item: T};

export type ListItemCheckboxProps<T> = ItemProp<T> &
  Omit<BaseListItemProps, 'onPress'> & {
    checked: boolean;
    onPress?: T extends undefined ? () => void : (item: T) => void;
  };
export interface ListItemSwitchProps extends BaseListItemProps {
  switchProps: SwitchProps;
}
export interface ListItemWrapperProps {
  testID: string;
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  position: 'top' | 'middle' | 'bottom' | 'single';
}
