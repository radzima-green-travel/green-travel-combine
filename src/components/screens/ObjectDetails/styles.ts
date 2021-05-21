import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';

const ratio = 310 / 375;
export const IMAGE_WIDTH = SCREEN_WIDTH;
export const IMAGE_HEIGHT = IMAGE_WIDTH * ratio;

export const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    paddingHorizontal: 16,
  },
  withoutPagerContentContainer: {
    marginTop: 16,
  },
  listContentContainer: {
    paddingBottom: 16,
    paddingTop: IMAGE_HEIGHT,
  },
  button: {
    marginTop: 24,
  },

  emptyContatiner: {
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.alabaster,
    marginBottom: 24,
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
});

export const gradientConfig = {
  colors: ['rgba(32, 36, 30, 0.8)', 'rgba(32, 36, 30, 0)'],
  start: {x: 0.0, y: 0},
  end: {x: 0.0, y: 1},
};
