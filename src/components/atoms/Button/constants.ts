import {COLORS} from 'assets/colors';
import {ButtonThemes} from './types';

export const BUTTON_THEMES: {[key in ButtonThemes]: {[key: string]: object}} = {
  green: {
    container: {
      backgroundColor: {
        light: COLORS.apple,
        dark: COLORS.oceanGreen,
      },
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
