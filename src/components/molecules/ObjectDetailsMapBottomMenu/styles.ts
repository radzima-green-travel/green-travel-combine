import {COLORS, FONTS_STYLES} from 'assets';

export const MENU_HEIGHT = 218;

export const themeStyles = {
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    ...FONTS_STYLES.semibold20,
    color: COLORS.logCabin,
    flexShrink: 1,
  },

  subtitle: {
    ...FONTS_STYLES.regular13,
    color: COLORS.logCabin,
    marginTop: 4,
  },
  button: {
    marginTop: 'auto',
  },
};
