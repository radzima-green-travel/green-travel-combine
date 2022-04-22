import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 23.5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 3.5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.apple,
  },
  tabText: {
    ...FONTS_STYLES.regular16,
  },
  activeTabText: {
    ...FONTS_STYLES.semibold16,
    color: COLORS.apple,
  },
});
