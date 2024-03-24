import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 8,
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
    marginHorizontal: 4,
  },
  icon: {
    color: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
});
