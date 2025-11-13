import { COLORS, FONTS_STYLES } from 'assets';

export const themeStyles = {
  container: {
    alignItems: 'center',
  },
  title: {
    ...FONTS_STYLES.semibold18,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    ...FONTS_STYLES.regular16,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    textAlign: 'center',
  },
  icon: {
    marginVertical: 40,
  },
  buttonText: {
    textTransform: 'uppercase',
  },
};
