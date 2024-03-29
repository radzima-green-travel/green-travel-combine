import {COLORS, FONTS_STYLES} from 'assets';
import {Platform} from 'react-native';
export const themeStyles = {
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
    borderRadius: 4,
    marginBottom: 2,
    paddingLeft: 16,

    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },

  input: {
    ...FONTS_STYLES.regular15,
    lineHeight: undefined,
    height: '100%',
    ...Platform.select({
      ios: {},
      android: {
        padding: 0,
      },
    }),
    flex: 1,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
  },
  icon: {
    marginRight: 6,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
};

const crossHitClop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

const hitSlop = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 6,
};

export {crossHitClop, hitSlop};
