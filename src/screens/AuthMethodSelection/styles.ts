import { COLORS } from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 4,
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
