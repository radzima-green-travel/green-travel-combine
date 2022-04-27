import {Platform} from 'react-native';

export function useBoxShadowStyle(
  styles,
  xOffset,
  yOffset,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColor,
) {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColor,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColor,
    };
  }
}
