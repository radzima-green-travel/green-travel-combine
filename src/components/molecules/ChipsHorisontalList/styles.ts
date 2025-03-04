import {StyleSheet} from 'react-native';
import {PADDING_HORIZONTAL} from 'core/constants';
import {FONTS_PRESETS} from 'assets';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_PRESETS.headlineBold,
    paddingBottom: 12,
  },
  listContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipWrapper: {
    flexShrink: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  lastChipWrapper: {
    marginRight: 0,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemTextStyle: {
    ...FONTS_PRESETS.caption1Bold,
  },
});
