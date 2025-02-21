import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  containerSmall: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 6,
  },
  containerMedium: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  label: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.tertiary,
      dark: COLORS.dark.text.tertiary,
    },
  },
  countLabel: {
    ...FONTS_PRESETS.caption2Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  icon: {
    color: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
});
