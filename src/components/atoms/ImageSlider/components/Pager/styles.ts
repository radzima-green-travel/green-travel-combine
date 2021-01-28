import {StyleSheet} from 'react-native';
import {DOT_OFFSET} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    maxWidth: DOT_OFFSET * 8,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
});
