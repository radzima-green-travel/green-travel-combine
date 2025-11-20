import { IProps } from './types';

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { COLORS } from 'assets';
export type ScreenOptions = (props: IProps) => NativeStackNavigationOptions;

export const screenOptions: NativeStackNavigationOptions = {
  contentStyle: {
    backgroundColor: COLORS.alabaster,
  },
};
