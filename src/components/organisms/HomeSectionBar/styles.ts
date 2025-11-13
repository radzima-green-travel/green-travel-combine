import { FONTS_STYLES, COLORS } from 'assets';
import { PADDING_HORIZONTAL, INTERACTIVE_CARD_RATIO } from 'core/constants';
import { SCREEN_WIDTH } from 'services/PlatformService';

export const cardWidth = Math.round(
  (SCREEN_WIDTH - PADDING_HORIZONTAL * 2) * 0.945,
);

export const cardHeihgt = cardWidth / INTERACTIVE_CARD_RATIO;
export const SNAP_INTERVAL = cardWidth + PADDING_HORIZONTAL;

export const themeStyles = {
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
    textTransform: 'uppercase',
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
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
    color: {
      light: COLORS.apple,
      dark: COLORS.white,
    },
    textTransform: 'uppercase',
  },
};
