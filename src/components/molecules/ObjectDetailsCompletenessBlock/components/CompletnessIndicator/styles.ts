import {COLORS, FONTS_PRESETS} from 'assets';

import {createThemeStyles} from 'core/helpers/styles';
import {smallProgressHeight} from '../ProgressBar/styles';

export const calloutBorderRadius = 10;
const calloutArrowWidth = 2;
const calloutArrowHightSmall = 8;
const calloutSmallBorderWidth = 3;

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  containerSmall: {
    paddingHorizontal: 0,
  },
  wrapper: {height: 44, marginTop: 10},
  callout: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    backgroundColor: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
    borderRadius: calloutBorderRadius,
    alignItems: 'center',
    flexDirection: 'row',
  },
  calloutSmall: {
    paddingVertical: 2,
    borderRadius: calloutBorderRadius,
    borderWidth: calloutSmallBorderWidth,
    borderColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
    marginBottom: calloutArrowHightSmall - calloutSmallBorderWidth,
  },
  calloutContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  calloutContainerSmall: {
    top: 'auto',
    bottom: smallProgressHeight,
  },
  calloutArrow: {
    width: calloutArrowWidth,
    height: 12,
    backgroundColor: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
    transform: [{translateX: -calloutArrowWidth / 2}],
  },
  calloutArrowSmall: {
    height: calloutArrowHightSmall,
    position: 'absolute',
    bottom: 0,
  },
  calloutText: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
    marginRight: 8,
  },

  calloutTextSmall: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
    marginRight: 4,
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  imageSmall: {
    width: 18,
    height: 18,
    marginLeft: 4,
  },
});
