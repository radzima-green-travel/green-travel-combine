import {FONTS_PRESETS, COLORS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const widgetStyles = createThemeStyles({
  container: {flex: 1, gap: 8},
  title: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  hightlightedText: {
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
  },
});
