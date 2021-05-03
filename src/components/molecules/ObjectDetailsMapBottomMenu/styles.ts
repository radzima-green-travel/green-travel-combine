import {COLORS, FONTS_STYLES} from 'assets';

export const MENU_HEIGHT = 169;

export const themeStyles = {
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 10,
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

  touchIndicator: {
    width: 36,
    height: 3.5,
    borderRadius: 100,
    backgroundColor: COLORS.alto,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 14.5,
  },
};
