import { COLORS, FONTS_STYLES } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';

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
      light: COLORS.dimGrey,
      dark: COLORS.altoForDark,
    },
  },
  text: {
    ...FONTS_STYLES.regular12,
    color: {
      light: COLORS.dimGrey,
      dark: COLORS.altoForDark,
    },
  },
  textContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  withBorder: {
    height: 16,
    marginLeft: 2,
    borderBottomWidth: 1,
    borderColor: {
      light: COLORS.dimGrey,
      dark: COLORS.altoForDark,
    },
  },
};
