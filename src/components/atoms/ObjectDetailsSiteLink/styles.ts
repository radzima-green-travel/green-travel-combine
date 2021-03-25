import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    ...FONTS_STYLES.semibold15,
    color: COLORS.logCabin,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: COLORS.cornflowerBlue,
    marginLeft: 5,
  },
};
