import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';
import {PADDING_HORIZONTAL} from 'core/constants';
import {HEADER_OVERLAY_OFFSET} from './constants';

export const themeStyles = createThemeStyles({
  container: {
    paddingTop: 20,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: PADDING_HORIZONTAL,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    gap: 20,
  },
  overlay: {
    borderBottomLeftRadius: HEADER_OVERLAY_OFFSET,
    borderBottomRightRadius: HEADER_OVERLAY_OFFSET,
    marginBottom: -HEADER_OVERLAY_OFFSET,
    zIndex: 100,
  },
  block: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
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
});
