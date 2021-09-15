import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
    paddingHorizontal: 16,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
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
  icon: {
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
  },
};
