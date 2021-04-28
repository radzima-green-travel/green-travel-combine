import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';

export const TOP_RATIO = 15 / 310;
export const RIGHT_RATIO = 16 / 375;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
