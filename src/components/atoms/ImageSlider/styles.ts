import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';

const ratio = 310 / 375;
export const IMAGE_WIDTH = SCREEN_WIDTH;
export const IMAGE_HEIGHT = IMAGE_WIDTH * ratio;

const styles = StyleSheet.create({
  container: {
    height: IMAGE_HEIGHT,
  },

  emptyContatiner: {
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.alabaster,
    marginBottom: 24,
  },
  image: {
    width: IMAGE_WIDTH,
  },
  pagerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
});

export {styles};
