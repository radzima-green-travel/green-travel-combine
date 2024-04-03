import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderRadius: 21,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftImage: {
    width: 48,
    height: 48,
  },
  contentContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  title: {
    ...FONTS_PRESETS.calloutBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  link: {
    ...FONTS_PRESETS.calloutRegular,
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
    marginTop: 2,
  },

  subtitle: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    marginTop: 2,
  },
});
