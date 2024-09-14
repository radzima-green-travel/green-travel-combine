import {COLORS, FONTS_STYLES} from 'assets';
import {StyleSheet} from 'react-native';

export const heightS = 44;
export const heightM = 95;

export const themeStyles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: heightS,
    borderRadius: 14,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 16,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  containerM: {
    height: heightM,
  },
  topContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottomContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  border: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
  },

  title: {
    ...FONTS_STYLES.regular17,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  titleM: {
    ...FONTS_STYLES.regular22,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  subtitle: {
    ...FONTS_STYLES.regular13,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  leftElementContainer: {
    marginRight: 10,
  },
  leftElementContainerM: {
    marginRight: 13,
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  titleRed: {
    color: COLORS.red,
  },
  rightElementContainer: {
    marginRight: 16,
  },
  chevronContainer: {
    marginLeft: 12,
  },
};
