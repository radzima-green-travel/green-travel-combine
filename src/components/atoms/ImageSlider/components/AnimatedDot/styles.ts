import {StyleSheet} from 'react-native';
import {DOT_MARGIN, DOT_SIZE} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginRight: DOT_MARGIN,
    backgroundColor: '#D9D9D9',
  },
  active: {
    backgroundColor: '#4BA83B',
  },
});
