import {COLORS} from 'assets/colors';

type CheckboxThemes = 'default';

type CheckboxSizes = 'small' | 'medium';

type CheckboxShapes = 'circle' | 'default';

export const CHECKBOX_THEMES: {
  [key in CheckboxThemes]: {[key: string]: object};
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
    selected: {
      backgroundColor: {
        light: COLORS.light.background.success,
        dark: COLORS.dark.background.success,
      },
      borderColor: {
        light: COLORS.light.background.success,
        dark: COLORS.dark.background.success,
      },
    },
    disabled: {
      backgroundColor: {
        light: COLORS.light.background.disable,
        dark: COLORS.dark.background.disable,
      },
      borderColor: {
        light: COLORS.light.stroke.tertiary,
        dark: COLORS.dark.stroke.tertiary,
      },
    },
    icon: {
      color: {
        light: COLORS.light.icon.constant,
        dark: COLORS.dark.icon.constant,
      },
    },
    iconDisabled: {
      color: {
        light: COLORS.light.stroke.tertiary,
        dark: COLORS.dark.stroke.tertiary,
      },
    },
  },
};

export const CHECKBOX_SIZES: {
  [key in CheckboxSizes]: {[key: string]: object};
} = {
  small: {
    container: {
      width: 18,
      height: 18,
    },
    CheckXLIcon: {
      width: 20,
      height: 14,
    },
    minusIcon: {
      width: 10,
      height: 2,
    },
    ellipseIcon: {
      width: 6,
      height: 6,
    },
  },
  medium: {
    container: {
      width: 24,
      height: 24,
    },
    CheckXLIcon: {
      width: 24,
      height: 18,
    },
    minusIcon: {
      width: 12,
      height: 2,
    },
    ellipseIcon: {
      width: 8,
      height: 8,
    },
  },
};

export const CHECKBOX_SHAPES: {
  [key in CheckboxShapes]: {[key: string]: object};
} = {
  circle: {
    container: {
      borderRadius: 50,
    },
  },
  default: {
    container: {
      borderRadius: 4,
    },
  },
};
