import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';
import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';

const ratio = 273 / 375;
export const IMAGE_WIDTH = SCREEN_WIDTH;
export const IMAGE_HEIGHT = IMAGE_WIDTH * ratio;

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  contentContainer: {},

  listContentContainer: {
    paddingBottom: 80,
    paddingTop: IMAGE_HEIGHT,
  },

  sectionTitle: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    margin: PADDING_HORIZONTAL,
  },

  visitedButtonContainer: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 14,
    paddingBottom: PADDING_HORIZONTAL,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  visitedButtonText: {
    position: 'absolute',
  },
  visitedButton: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  animationContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
    zIndex: 1,
  },
  imageSliderContainer: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    height: IMAGE_HEIGHT,
  },

  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  andoridHeaderBG: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.97,
  },
  reportInaccuraciesButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  listItemIcon: {
    color: {
      light: COLORS.light.icon.accentLight,
      dark: COLORS.dark.icon.accentLight,
    },
  },
  listItemContainer: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    marginHorizontal: PADDING_HORIZONTAL,
  },
  loader: {
    position: 'absolute',
    top: IMAGE_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export const gradientConfig = {
  colors: ['rgba(32, 36, 30, 0.8)', 'rgba(32, 36, 30, 0)'],
  start: {x: 0.0, y: 0},
  end: {x: 0.0, y: 1},
};
