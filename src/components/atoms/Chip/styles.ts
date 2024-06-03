import {FONTS_PRESETS} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: 28,
    minWidth: 55,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
  },
  text: {
    ...FONTS_PRESETS.bodyRegular,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
