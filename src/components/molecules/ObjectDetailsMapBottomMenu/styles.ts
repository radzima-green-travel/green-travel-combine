import {COLORS, FONTS_STYLES} from 'assets';
import {MAP_BOTTOM_MENU_HEIGHT} from 'core/constants';

export const themeStyles = {
  container: {
    minHeight: MAP_BOTTOM_MENU_HEIGHT,
    paddingTop: 16,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
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

  touchIndicator: {
    width: 36,
    height: 3.5,
    borderRadius: 100,
    backgroundColor: COLORS.alto,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 14.5,
  },
  icon: {
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
  },
};
