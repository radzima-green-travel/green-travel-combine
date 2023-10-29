import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: PADDING_HORIZONTAL,
    marginTop: 32,
    alignSelf: 'stretch',
  },
  title: {
    ...FONTS_STYLES.regular24,
    textAlign: 'center',
    marginBottom: 16,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
  },
  icon: {
    color: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
};
