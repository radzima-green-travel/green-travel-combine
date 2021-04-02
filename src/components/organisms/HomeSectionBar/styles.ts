import {StyleSheet} from 'react-native';
import {FONTS_STYLES, COLORS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {ratio} from 'atoms/Card/Card';

export const cardWidth = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2) * 0.945;
export const cardHeihgt = cardWidth / ratio;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: 16,
  },
  contentContainer: {
    paddingRight: 16,
    paddingBottom: 24,
    height: cardHeihgt + 24,
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
    color: COLORS.apple,
    textTransform: 'uppercase',
  },
});
