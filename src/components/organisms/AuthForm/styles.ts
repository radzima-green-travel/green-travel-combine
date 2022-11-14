import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    paddingTop: 52,
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    flex: 1,
  },
  title: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginTop: 24,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
  },
  secondaryButtonText: {
    ...FONTS_STYLES.regular16,
    color: {
      light: COLORS.apple,
      dark: COLORS.oceanGreen,
    },
    textAlign: 'center',
    marginTop: 25,
  },
  formFieldsContainer: {
    marginTop: 20,
    marginBottom: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
};
