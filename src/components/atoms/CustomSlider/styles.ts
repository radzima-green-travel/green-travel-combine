import { COLORS, FONTS_PRESETS } from 'assets';
import { hexWithAlpha } from 'core/helpers/common';
import { createThemeStyles } from 'core/helpers/styles';
import { isIOS } from 'services/PlatformService';

export const thumbSize = 28;

export const themeStyles = createThemeStyles({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: -6,
  },
  sliderContainer: {
    flex: 1,
  },
  thumbStyle: {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize,
    backgroundColor: {
      light: COLORS.light.icon.constant,
      dark: COLORS.dark.icon.constant,
    },
    borderWidth: 1,
    borderColor: {
      light: COLORS.light.stroke.borderAlhpa,
      dark: COLORS.dark.stroke.borderAlhpa,
    },
    ...(isIOS
      ? {
          shadowColor: hexWithAlpha('#000000', 0.11),
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 0,
        }
      : {
          elevation: 2,
        }),
  },
  trackStyle: {
    marginHorizontal: thumbSize / 2 - 1,
    height: 4,
    borderRadius: 10,
    backgroundColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
  },
  leftTrackStyle: {
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
  marksContainer: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  mark: {
    height: 4,
    width: 1,
    borderRadius: 1,
    marginBottom: 3,
    backgroundColor: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  markContainer: {
    alignItems: 'center',
    opacity: 0.3,
  },
  markText: {
    ...FONTS_PRESETS.caption2Regular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
});
