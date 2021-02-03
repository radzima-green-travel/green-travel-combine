import {StyleSheet} from 'react-native';

export const FONTS = {
  primary: 'Montserrat-SemiBold',
  primaryBold: 'Montserrat-Bold',
  secondaryBold: 'Montserrat-Bold',
  secondarySemibold: 'Montserrat-SemiBold',

  bold: 'Montserrat-Bold',
  semibold: 'Montserrat-SemiBold',
  regular: 'Montserrat-Regular',
};

export const FONTS_STYLES = StyleSheet.create({
  bold15: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  semibold20: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONTS.semibold,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  semibold16: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.semibold,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  semibold14: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.semibold,
    lineHeight: 22,
  },
  semibold12: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.semibold,
    lineHeight: 15,
    letterSpacing: 0.2,
  },
  regular15: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    lineHeight: 22,
  },
  regular13: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
});
