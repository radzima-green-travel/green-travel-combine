import {COLORS} from 'assets/colors';
import {ButtonThemes, ThemeData} from './types';

export const BUTTON_THEMES: {[key in ButtonThemes]: ThemeData} = {
  green: {
    container: {
      backgroundColor: COLORS.apple,
    },
    disabled: {
      backgroundColor: COLORS.silver,
    },
    active: {
      backgroundColor: COLORS.forestGreen,
    },
    text: {
      color: COLORS.white,
    },
    disabledText: {
      color: COLORS.white,
    },
  },
};
