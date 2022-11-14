import {COLORS} from 'assets';

export const themeStyles = {
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
};
