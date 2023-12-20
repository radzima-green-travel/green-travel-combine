import {FONTS_STYLES} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  iconButton: {
    width: 48,
  },
  text: {
    ...FONTS_STYLES.text_14_20_500,
  },
  iconContainer: {
    marginRight: 8,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 18,
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    bottom: -50,
  },
});
