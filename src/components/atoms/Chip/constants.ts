import {COLORS} from 'assets/colors';

type ChipThemes = 'default';

export const CHIP_THEMES: {[key in ChipThemes]: {[key: string]: object}} = {
  default: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.secondary,
        dark: COLORS.dark.background.secondary,
      },
    },
    text: {
      color: {
        light: COLORS.light.text.primary,
        dark: COLORS.dark.text.primary,
      },
    },
    icon: {
      color: {
        light: COLORS.light.icon.secondary,
        dark: COLORS.dark.icon.secondary,
      },
    },
    disabled: {
      backgroundColor: {
        light: COLORS.light.background.secondary,
        dark: COLORS.dark.background.secondary,
      },
      borderWidth: 0,
    },
    disabledText: {
      color: {
        light: COLORS.light.text.disable,
        dark: COLORS.dark.text.disable,
      },
    },
    disabledIcon: {
      color: {
        light: COLORS.light.icon.disable,
        dark: COLORS.dark.icon.disable,
      },
    },
    active: {
      backgroundColor: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
      borderWidth: 0,
    },
    activeText: {
      color: {
        light: COLORS.light.text.constant,
        dark: COLORS.dark.text.constant,
      },
    },
    activeIcon: {
      color: {
        light: COLORS.light.icon.constant,
        dark: COLORS.dark.icon.constant,
      },
    },
    outlinedBorder: {
      borderColor: {
        light: COLORS.light.background.accent,
        dark: COLORS.dark.background.accent,
      },
      borderWidth: 2,
    },
  },
};
