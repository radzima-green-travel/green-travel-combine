import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 24,
    paddingBottom: 24,
  },
  itemContainer: {
    marginBottom: 24,
  },
  email: {
    ...FONTS_STYLES.regular17,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
};
