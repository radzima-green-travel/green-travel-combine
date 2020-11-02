import {StyleSheet} from 'react-native';
import {BookmarkItem} from 'atoms';

export const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 12,
    // @ts-ignore
    paddingHorizontal: BookmarkItem.paddingHorizontal,
    marginBottom: 16,
    marginTop: 32,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
