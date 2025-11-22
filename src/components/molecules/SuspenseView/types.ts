import { ReactNode } from 'react';
import { ILabelError } from 'core/types';
import { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  loading?: boolean;
  error?: Pick<ILabelError, 'text' | 'title'> | null;
  darkBackground?: boolean;
  retryCallback?: () => void;
  children?: ReactNode;
  cover?: boolean;
  buttonText?: string;
  testID: string;
  loadingDelay?: number;
  loaderBackdropStyle?: StyleProp<ViewStyle>;
};
