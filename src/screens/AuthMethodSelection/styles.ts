import {COLORS} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    textAlign: 'center',
    position: 'absolute',
    bottom: 8,
    color: {
      light: COLORS.boulder,
      dark: COLORS.silver,
    },
  },
  linkText: {
    textDecorationLine: {
      light: 'none',
      dark: 'underline',
    },
    color: {
      light: COLORS.cornflowerBlue,
      dark: COLORS.silver,
    },
  },
};
