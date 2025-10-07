import {StyleSheet} from 'react-native';
import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';
import type {LinearGradientProps} from 'expo-linear-gradient';

export const themeStyles = {
  cardContainer: {
    height: 144,
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: {
      light: 0.3,
      dark: 0,
    },
    shadowRadius: 4,
    elevation: {
      light: 5,
      dark: 0,
    },
    borderRadius: 4,
    backgroundColor: {
      light: '#FAFAFA',
      dark: COLORS.fiord,
    },
    borderColor: {
      light: 'transparent',
      dark: COLORS.altoForDark,
    },
    borderWidth: {
      light: 0,
      dark: 1,
    },
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  cardContentContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  title: {
    flex: 1,
    ...FONTS_STYLES.bold15,
    color: COLORS.white,
  },
  emptyCardTitle: {
    flex: 1,
    ...FONTS_STYLES.bold15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.alabaster,
    },
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  icon: {
    color: {
      light: COLORS.white,
      dark: COLORS.white,
    },
  },
  emptyCardIcon: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.alabaster,
    },
  },
};

export const gradientConfig: LinearGradientProps = {
  colors: ['rgba(32, 36, 30, 0.9)', 'rgba(32, 36, 30, 0)'],
  start: {x: 0.0, y: 0},
  end: {x: 0.0, y: 0.5},
};
