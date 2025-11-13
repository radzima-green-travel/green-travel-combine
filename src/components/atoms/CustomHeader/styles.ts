import { PADDING_HORIZONTAL, HEADER_BOTTOM_RADIUS } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';
import { COLORS } from '../../../assets';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: PADDING_HORIZONTAL,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  overlay: {
    borderBottomLeftRadius: HEADER_BOTTOM_RADIUS,
    borderBottomRightRadius: HEADER_BOTTOM_RADIUS,
    marginBottom: -HEADER_BOTTOM_RADIUS,
    zIndex: 100,
  },
  mainContentContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  headerRightContainer: {
    marginLeft: 8,
  },
  expanded: {
    flex: 1,
  },
});
