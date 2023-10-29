import {SCREEN_WIDTH} from 'services/PlatformService';

export const TOP = 15;
export const LEFT_RATIO = 16 / 375;

export const themeStyles = {
  iconContainer: {
    position: 'absolute',

    left: LEFT_RATIO * SCREEN_WIDTH,
  },
};
