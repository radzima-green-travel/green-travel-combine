import { COLORS } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';
import { StyleSheet } from 'react-native';

export const themeStyles = {
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
};
