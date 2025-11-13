import { COLORS } from 'assets';

import { createThemeStyles } from 'core/helpers/styles';

const thubSize = 12;
const thubSizeSmall = 8;
export const smallProgressHeight = 4;

export const themeStyles = createThemeStyles({
  progressContainer: {
    height: 6,
    backgroundColor: {
      light: COLORS.light.background.accentLight,
      dark: COLORS.dark.background.accentLight,
    },
    flexDirection: 'row',
    borderRadius: 4,
    marginTop: 'auto',
  },
  progressContainerSmall: {
    height: smallProgressHeight,
  },

  progress: {
    position: 'absolute',
    height: '100%',
    borderRadius: 4,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
  },

  thumb: {
    position: 'absolute',
    width: thubSize,
    height: thubSize,
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },

    borderRadius: thubSize,
    borderWidth: thubSize / 4,
    borderColor: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
    top: '50%',
    transform: [{ translateY: -thubSize / 2 }, { translateX: -thubSize / 2 }],
  },

  thumbSmall: {
    width: thubSizeSmall,
    height: thubSizeSmall,
    borderRadius: thubSizeSmall,
    borderWidth: thubSizeSmall / 4,
    transform: [
      { translateY: -thubSizeSmall / 2 },
      { translateX: -thubSizeSmall / 2 },
    ],
  },
});
