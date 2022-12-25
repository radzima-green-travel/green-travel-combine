import {COLORS, FONTS_STYLES} from 'assets';
import {hexWithAlpha} from 'core/helpers';
import {StyleSheet} from 'react-native';

export const heightS = 44;
export const heightM = 95;

export const themeStyles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightS,
    borderRadius: 14,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 16,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
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
    justifyContent: 'space-between',
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingRight: 16,
  },
  withContentBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: {
      light: hexWithAlpha(COLORS.tuna, 0.36),
      dark: hexWithAlpha(COLORS.altoForDark, 0.1),
    },
  },
  textContainer: {},
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
    marginRight: 16,
  },
  leftElementContainerM: {
    marginRight: 13,
  },
  loading: {
    opacity: 0,
  },
  titleRed: {
    color: COLORS.red,
  },
  rightElementContainer: {
    minHeight: 20,
    minWidth: 20,
  },
};
