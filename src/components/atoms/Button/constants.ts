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
  blackAndWhite: {
    container: {
      backgroundColor: {
        light: COLORS.black,
        dark: COLORS.white,
      },
    },
    text: {
      color: {
        light: COLORS.white,
        dark: COLORS.black,
      },
    },
  },
  bordered: {
    container: {
      backgroundColor: {
        light: 'transparent',
        dark: COLORS.mirage,
      },
      borderWidth: 1,
      borderColor: {
        light: COLORS.boulder,
        dark: COLORS.silver,
      },
    },
    text: {
      color: {
        light: COLORS.balticSea,
        dark: COLORS.white,
      },
    },
  },
};
