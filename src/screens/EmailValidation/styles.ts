import { COLORS, FONTS_STYLES } from 'assets';

export const themeStyles = {
  container: {
    marginHorizontal: 24,
    marginTop: '20%',
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...FONTS_STYLES.semibold20,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginBottom: 20,
  },
  repeatText: {
    ...FONTS_STYLES.regular16,
    color: {
      light: COLORS.apple,
      dark: COLORS.oceanGreen,
    },
    textAlign: 'center',
    marginTop: 25,
  },
  notActivated: {
    backgroundColor: {
      light: COLORS.alto,
      dark: COLORS.silver,
    },
  },
};
