import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';
import {IMAGE_HEIGHT, IMAGE_WIDTH} from 'atoms/ImageSlider/styles';

const TOP_RATIO = 24 / 310;
const RIGHT_RATIO = 16 / 375;

export const styles = StyleSheet.create({
  leftButton: {
    position: 'absolute',
    left: 15,
    top: 44,
  },
  rightButton: {
    position: 'absolute',
    right: RIGHT_RATIO * IMAGE_WIDTH,
    top: TOP_RATIO * IMAGE_HEIGHT,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
