import type { ReactNode, ReactElement } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { NavigationProp } from '@react-navigation/native';
import type { SystemBarStyle } from 'react-native-edge-to-edge';
import type { IconName } from '../../atoms/Icon/types';
import type { OneOf } from '../../../core/types/utils/common';

export interface HeaderContextValue {
  navigation: NavigationProp<any>;
  canGoBack: boolean;
}

export type HeaderRenderProp = (props: HeaderContextValue) => ReactNode;

export type HeaderContent = ReactNode | HeaderRenderProp;

export type HeaderAlign = 'left' | 'center' | 'right';

export type HeaderTitleSize = 'small' | 'large';
export interface HeaderProps {
  overlaysContent?: boolean;
  replacesDefaultHeader?: boolean;
  statusbarStyle?: SystemBarStyle;

  backButtonIcon?: IconName;
  backButtonPosition?: 'left' | 'right' | 'topLeft' | 'topRight';
  backButtonAction?: () => void;
  backButtonHidden?: boolean;

  title?: string;
  titleAlign?: HeaderAlign;
  titleSize?: HeaderTitleSize;

  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;

  rightActions?: HeaderAction[];

  leftSlot?: HeaderContent;
  rightSlot?: HeaderContent;
  topSlot?: HeaderContent;
  titleSlot?: HeaderContent;
  bottomSlot?: HeaderContent;

  topAlign?: HeaderAlign;
  bottomAlign?: HeaderAlign;

  testID?: string;
}

export interface HeaderTitleProps {
  children: ReactNode;
  size?: HeaderTitleSize;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export interface HeaderBackButtonProps {
  icon?: IconName;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export type HeaderActionLayoutProps = OneOf<
  {
    label: string;
  },
  {
    icon: IconName;
  }
>;

export type HeaderActionButtonProps = HeaderActionLayoutProps & {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export type HeaderAction = HeaderActionLayoutProps & {
  action?: () => void;
};

export interface PageContentWithOverlayProps {
  children: ReactElement;
}
