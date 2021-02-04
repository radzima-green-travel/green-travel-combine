import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  textContainer: {
    marginLeft: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.alto,
    flex: 1,
  },
  title: {
    ...FONTS_STYLES.bold15,
    color: COLORS.logCabin,
  },
  subtitle: {
    ...FONTS_STYLES.regular13,
    color: COLORS.boulder,
  },
  icon: {
    marginBottom: 'auto',
  },
};
