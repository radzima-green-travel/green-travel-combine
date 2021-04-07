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
    marginBottom: 'auto',
  },
  text: {
    ...FONTS_STYLES.semibold20,
    color: COLORS.logCabin,
    flexShrink: 1,
  },
};
