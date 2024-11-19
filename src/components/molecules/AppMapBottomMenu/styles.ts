import {COLORS, FONTS_STYLES} from 'assets';
import {MAP_BOTTOM_MENU_HEIGHT} from 'core/constants';

export const themeStyles = {
  container: {
    paddingTop: 16,
    minHeight: MAP_BOTTOM_MENU_HEIGHT,
    backgroundColor: {
      light: COLORS.light.background.transparent,
      dark: COLORS.dark.background.transparent,
    },
    paddingHorizontal: 16,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    ...FONTS_STYLES.semibold20,
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
    flexShrink: 1,
  },

  subtitle: {
    ...FONTS_STYLES.regular13,
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
    marginTop: 4,
  },
  button: {
    marginTop: 14,
  },
  noBottomInset: {
    marginBottom: 16,
  },

  icon: {
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
  },
};
