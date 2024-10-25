import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  text: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    textAlign: 'center',
    paddingTop: 27,
    paddingBottom: 30,
  },
  icon: {
    color: {
      light: COLORS.balticSea,
      dark: COLORS.mirage,
    },
  },
});
