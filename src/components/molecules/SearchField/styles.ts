import {COLORS, FONTS_PRESETS} from 'assets';

export const themeStyles = {
  container: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    borderRadius: 12,
    padding: 12,
    marginVertical: 16,
  },
  input: {
    ...FONTS_PRESETS.calloutRegular,
    lineHeight: undefined,
    height: '100%',
    flex: 1,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
  },
  icon: {
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
  placeholderTextColor: {
    light: COLORS.light.text.tertiary,
    dark: COLORS.dark.text.tertiary,
  },
  selectionColor: {
    light: COLORS.light.text.primary,
    dark: COLORS.dark.text.primary,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 16,
  },
};
