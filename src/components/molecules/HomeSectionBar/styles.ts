import {StyleSheet} from 'react-native';
import {FONTS_STYLES, COLORS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: 16,
  },
  contentContainer: {
    paddingRight: 16,
    paddingBottom: 24,
  },
  crossButton: {
    position: 'absolute',
    left: 15,
    top: 44,
  },
  markerMapButton: {
    position: 'absolute',
    right: 30,
    top: 44,
  },
  sectionTitle: {
    flex: 1,
    ...FONTS_STYLES.semibold14,
    color: COLORS.logCabin,
    textTransform: 'uppercase',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  objectCardContainer: {
    marginRight: PADDING_HORIZONTAL,
  },
  all: {
    ...FONTS_STYLES.semibold14,
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
});
