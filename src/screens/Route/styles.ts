import { StyleSheet } from 'react-native';
import { PADDING_HORIZONTAL } from 'core/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
