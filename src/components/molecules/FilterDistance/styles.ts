import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  subFilterName: {
    ...FONTS_PRESETS.subheadlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingVertical: 8,
  },
  distanceStyle: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingVertical: 8,
    textAlign: 'center',
  },
});
