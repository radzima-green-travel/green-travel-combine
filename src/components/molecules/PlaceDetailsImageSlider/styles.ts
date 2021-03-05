import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  leftButton: {
    position: 'absolute',
    left: 15,
    top: 44,
  },
  rightButton: {
    position: 'absolute',
    right: 30,
    top: 44,
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
