import { COLORS } from 'assets/colors';

type CheckboxThemes = 'default';

export const CHECKBOX_THEMES: {
  [key in CheckboxThemes]: { [key: string]: object };
} = {
  default: {
    container: {
      backgroundColor: {
        light: COLORS.light.background.primary,
        dark: COLORS.dark.background.primary,
      },
      borderColor: {
        light: COLORS.light.stroke.border,
        dark: COLORS.dark.stroke.border,
      },
    },
    checked: {
      backgroundColor: {
        light: COLORS.light.background.success,
        dark: COLORS.dark.background.success,
      },
      borderColor: {
        light: COLORS.light.background.success,
        dark: COLORS.dark.background.success,
      },
    },
    icon: {
      color: {
        light: COLORS.light.icon.constant,
        dark: COLORS.dark.icon.constant,
      },
    },
  },
};
