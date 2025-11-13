import { COLORS, FONTS_STYLES } from 'assets';

import { StyleSheet } from 'react-native';

export const themeStyles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  headerBG: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderBottomWidth: 1,
    borderBottomColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
  },

  rightPlaceholder: {
    width: 32,
    height: 32,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8,
  },
  title: {
    ...FONTS_STYLES.headlineRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
};
