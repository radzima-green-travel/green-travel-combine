import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    alignSelf: 'stretch',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: {
      light: COLORS.silver,
      dark: COLORS.oxfordBlue,
    },
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.mirage,
    },
    alignSelf: 'stretch',
  },
  dangerBorder: {
    borderColor: COLORS.persimmon,
  },
  inputField: {
    height: 40,
    color: {
      light: COLORS.black,
      dark: COLORS.white,
    },
    flex: 1,
  },
  color: {
    light: COLORS.boulder,
    dark: COLORS.altoForDark,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: {
      light: COLORS.silver,
      dark: COLORS.oxfordBlue,
    },
  },
  icon: {
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    ...FONTS_STYLES.semibold14,
    marginBottom: 4,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
};
