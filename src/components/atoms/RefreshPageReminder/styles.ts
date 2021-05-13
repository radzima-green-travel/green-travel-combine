import {COLORS, FONTS_STYLES} from 'assets';
import {hexWithAlpha} from 'core/helpers';
import {StyleSheet, ViewStyle} from 'react-native';

const buttonStyles: ViewStyle = {
  minWidth: 212,
  paddingHorizontal: 16,
  borderRadius: 30,
  paddingVertical: 6,
};

const textStyles = {
  ...FONTS_STYLES.semibold15,
  color: {
    light: COLORS.white,
    dark: COLORS.altoForDark,
  },
  textAlign: 'center',
};

const positionStyles: ViewStyle = {
  position: 'absolute',
  top: 32,
  alignSelf: 'center',
};

export const themeStyles = {
  container: {
    position: 'absolute',
    height: 90,
    width: '100%',
    zIndex: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    ...buttonStyles,
    zIndex: 11,
  },
  reminder: {
    ...positionStyles,
    ...buttonStyles,
    backgroundColor: {
      light: COLORS.apple,
      dark: COLORS.mirage,
    },
    borderColor: {
      light: 'transparent',
      dark: hexWithAlpha(COLORS.altoForDark, 0.6),
    },
    borderWidth: {
      light: 0,
      dark: 1,
    },
    zIndex: 12,
  },
  reminderWidthPusher: {
    opacity: 0,
    ...textStyles,
  },
  textContainer: {
    ...positionStyles,
    zIndex: 13,
  },
  button: {
    ...buttonStyles,
  },
  text: {
    ...textStyles,
  },
};
