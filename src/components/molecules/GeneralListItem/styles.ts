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
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.mirage,
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
    borderColor: hexWithAlpha(COLORS.tuna, 0.36),
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
};
