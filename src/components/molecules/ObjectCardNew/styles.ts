import { COLORS, FONTS_PRESETS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';
import { StyleSheet } from 'react-native';

export const objectCardStyles = createThemeStyles({
  container: {
    flex: 1,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: { flex: 1, padding: 8 },
  image: StyleSheet.absoluteFillObject,
  detailsBlock: {
    paddingTop: 8,
    padding: 12,
    alignItems: 'flex-start',
    gap: 4,
  },
  ratingRow: { flexDirection: 'row', gap: 4, marginTop: 'auto' },
  name: {
    ...FONTS_PRESETS.caption1Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  category: {
    ...FONTS_PRESETS.caption2Regular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  favoriteToggleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.light.background.secondary,
    },
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  favoriteIcon: {
    color: {
      light: COLORS.light.background.accent,
      dark: COLORS.dark.background.accent,
    },
  },
});
