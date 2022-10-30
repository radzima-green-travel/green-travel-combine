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
    backgroundColor: COLORS.white,
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
    color: COLORS.logCabin,
  },
  titleM: {
    ...FONTS_STYLES.regular22,
    color: COLORS.logCabin,
  },
  subtitle: {
    ...FONTS_STYLES.regular13,
    color: COLORS.logCabin,
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
