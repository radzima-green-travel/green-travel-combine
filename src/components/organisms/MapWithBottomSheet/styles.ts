import { StyleSheet } from 'react-native';
import { COLORS, FONTS_PRESETS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const SNAP_POINT_0 = 68;
export const SNAP_POINT_1 = 250;

export const themeStyles = createThemeStyles({
  listContainer: {
    flex: 1,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  icon: {
    color: {
      light: COLORS.light.icon.accent,
      dark: COLORS.dark.icon.accent,
    },
  },
  bottomSheetContainer: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    marginTop: -12,
  },
  handleContainer: {
    height: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -12,
    paddingTop: 8,
  },
  indicator: {
    width: 44,
    height: 4,
    borderRadius: 4,
    backgroundColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
  },
  mapButtonContainer: {
    marginLeft: 'auto',
    marginRight: 16,
  },
  overlayStyle: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    ...StyleSheet.absoluteFillObject,
  },
  visibleObjectsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  resultsLabel: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  resultsContainer: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resultsCount: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.tertiary,
      dark: COLORS.dark.text.tertiary,
    },
  },

  loaderContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },

  bottomButton: { alignSelf: 'center', paddingHorizontal: 12 },
});
