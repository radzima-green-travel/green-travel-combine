import {COLORS} from 'assets/colors';
import {ButtonThemes} from './types';

export const BUTTON_THEMES: {[key in ButtonThemes]: {[key: string]: object}} = {
  primary: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
    },
    disabled: {
      backgroundColor: COLORS.silver,
    },
    text: {
      color: {
        light: COLORS.light.text.constant,
        dark: COLORS.light.text.constant,
      },
    },
    disabledText: {
      light: COLORS.light.text.constant,
      dark: COLORS.light.text.constant,
    },
  },
  secondary: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.primary,
        dark: COLORS.dark.background.primary,
      },
      borderWidth: 1,
      borderColor: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
    },
    text: {
      color: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
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
