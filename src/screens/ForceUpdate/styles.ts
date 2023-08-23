import {COLORS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
  },
};
