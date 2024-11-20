import {COLORS} from 'assets/colors';

export type MultiswitchThemes = 'default';

export const MULTISWITCH_THEMES: {
  [key in MultiswitchThemes]: {[key: string]: object};
} = {
  default: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.quarterly,
        dark: COLORS.dark.background.quarterly,
      },
    },
    nonActive: {
      backgroundColor: {
        light: COLORS.light.background.quarterly,
        dark: COLORS.dark.background.quarterly,
      },
    },
    nonActiveText: {
      color: {
        light: COLORS.light.text.accent,
        dark: COLORS.dark.text.accent,
      },
    },
    active: {
      backgroundColor: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
    },
    activeText: {
      color: {
        light: COLORS.light.text.constant,
        dark: COLORS.dark.text.constant,
      },
    },
    disabledText: {
      color: {
        light: COLORS.light.text.disable,
        dark: COLORS.dark.text.disable,
      },
    },
  },
};
