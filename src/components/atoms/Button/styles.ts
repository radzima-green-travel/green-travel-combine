import {FONTS_PRESETS} from 'assets';
import {Platform, StyleSheet} from 'react-native';

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
    alignSelf: undefined,
  },
  text: {
    ...FONTS_PRESETS.footnoteBold,
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
  shadow: Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowOffset: {width: 2, height: 9},
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    default: {
      elevation: 4,
      shadowColor: 'rgba(0, 0, 0, 0.15)',
    },
  }),
});
