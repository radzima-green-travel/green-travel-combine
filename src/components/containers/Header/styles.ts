import { COLORS, FONTS_PRESETS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';
import { PADDING_HORIZONTAL, HEADER_OVERLAY_OFFSET } from 'core/constants';

export const themeStyles = createThemeStyles({
  container: {
    paddingTop: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: 16,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    gap: 16,
  },
  overlay: {
    borderBottomLeftRadius: HEADER_OVERLAY_OFFSET,
    borderBottomRightRadius: HEADER_OVERLAY_OFFSET,
    marginBottom: -HEADER_OVERLAY_OFFSET,
    zIndex: 100,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightBlock: {
    marginLeft: 'auto',
  },
  expanded: {
    flex: 1,
  },
  contentAlign_left: {
    justifyContent: 'flex-start',
  },
  contentAlign_center: {
    justifyContent: 'center',
  },
  contentAlign_right: {
    justifyContent: 'flex-end',
  },
  title: {
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  titleLarge: FONTS_PRESETS.title3Bold,
  titleSmall: FONTS_PRESETS.subheadlineBold,
  actionButtonWithLabel: {
    alignSelf: 'stretch',
  },
  actionButtonLabel: {
    ...FONTS_PRESETS.calloutRegular,
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
});
