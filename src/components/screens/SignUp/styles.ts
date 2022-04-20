import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 9,
  },
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 3.5,
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
  title: {
    ...FONTS_STYLES.semibold20,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  lineAround: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.silver,
  },
  warning: {
    ...FONTS_STYLES.regular13,
    textAlign: 'center',
    marginTop: 'auto',
  },
});
