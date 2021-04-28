import {COLORS} from 'assets';
import {SCREEN_WIDTH} from 'services/PlatformService';

export const TOP = 15;
export const LEFT_RATIO = 16 / 375;

export const themeStyles = {
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.silver,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    left: LEFT_RATIO * SCREEN_WIDTH,
  },
};
