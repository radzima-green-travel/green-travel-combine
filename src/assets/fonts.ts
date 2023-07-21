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
    fontFamily: 'System',
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  semibold20: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  semibold18: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  semibold16: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  semibold15: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  semibold14: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
    lineHeight: 22,
  },
  semibold12: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.semibold,
    lineHeight: 15,
    letterSpacing: 0.2,
  },
  regular16: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 22,
  },
  regular15: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 22,
  },
  regular14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 24,
  },
  regular12: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 16,
  },
  regular13: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  regular17: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  regular22: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'System',
    lineHeight: 24,
    letterSpacing: 0.35,
  },
  regular24: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'System',
    lineHeight: 28,
  },
});
