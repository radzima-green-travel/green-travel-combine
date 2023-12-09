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
      backgroundColor: {
        light: COLORS.light.background.secondary,
        dark: COLORS.dark.background.secondary,
      },
    },
    text: {
      color: {
        light: COLORS.light.text.constant,
        dark: COLORS.light.text.constant,
      },
    },
    disabledText: {
      color: {
        light: COLORS.light.text.secondary,
        dark: COLORS.dark.text.secondary,
      },
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
    disabled: {
      borderColor: {
        light: COLORS.light.background.secondary,
        dark: COLORS.dark.background.secondary,
      },
      backgroundColor: {
        light: COLORS.light.background.secondary,
        dark: COLORS.dark.background.secondary,
      },
    },
    text: {
      color: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
    },
    disabledText: {
      color: {
        light: COLORS.light.text.secondary,
        dark: COLORS.dark.text.secondary,
      },
    },
  },
  tertiary: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.transparent,
        dark: COLORS.dark.background.transparent,
      },
      borderWidth: 1,
      borderColor: {
        light: COLORS.light.background.transparent,
        dark: COLORS.dark.background.transparent,
      },
    },
    disabled: {
      borderColor: {
        light: COLORS.light.background.transparent,
        dark: COLORS.dark.background.transparent,
      },
      backgroundColor: {
        light: COLORS.light.background.transparent,
        dark: COLORS.dark.background.transparent,
      },
    },
    text: {
      color: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
    },
    disabledText: {
      color: {
        light: COLORS.light.text.secondary,
        dark: COLORS.dark.text.secondary,
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
};
