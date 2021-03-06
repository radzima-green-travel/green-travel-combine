import {COLORS, FONTS_STYLES} from 'assets';
import {hexWithAlpha} from 'core/helpers';

export const themeStyles = {
  container: {
    flexDirection: 'row',
    paddingTop: 8,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
    paddingLeft: 16,
  },
  textContainer: {
    marginLeft: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: {
      light: COLORS.alto,
      dark: hexWithAlpha(COLORS.altoForDark, 0.3),
    },

    flex: 1,
  },
  title: {
    ...FONTS_STYLES.bold15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  subtitle: {
    ...FONTS_STYLES.regular13,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
  },
  icon: {
    marginBottom: 'auto',
  },
};
