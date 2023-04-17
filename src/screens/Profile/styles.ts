import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 24,
  },
  authItemContainer: {
    marginBottom: 24,
  },
  settingsItemContainer: {
    marginBottom: 24,
  },
  icon: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  rightText: {
    ...FONTS_STYLES.regular17,
    color: {
      light: COLORS.cullGrey,
      dark: COLORS.altoForDark,
    },
  },
};
